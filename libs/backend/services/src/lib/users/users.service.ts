import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '@sleep-valley/backend/database';
import { UserEntity } from '@sleep-valley/backend/entities';
import { GoogleLogin } from '@sleep-valley/core/interfaces';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel(UserModel) private readonly userModel: typeof UserModel) {}

  public async get(userID: UserEntity['id'], user: Partial<UserEntity>) {
    const userDB = await this.userModel.findOne({
      ...UserModel.baseOptions,
      where: { id: userID },
    });

    if (!userDB) {
      return null;
    }

    return new UserEntity(userDB.toJSON(), user);
  }

  public async getLogged(userID: UserEntity['id']) {
    const user = await this.userModel.findOne({
      ...UserModel.baseOptions,
      attributes: {
        exclude: ['googleToken'],
      },
      where: { id: userID },
    });

    if (!user) {
      return null;
    }

    return new UserEntity(user?.toJSON(), user?.toJSON());
  }

  public async getByEmail(email: UserEntity['email']) {
    const user = await this.userModel.findOne({
      ...UserModel.baseOptions,
      attributes: {
        exclude: ['googleToken'],
      },
      where: { email },
    });

    if (!user) {
      return null;
    }

    return new UserEntity(user.toJSON(), user.toJSON());
  }

  public async getInGame(userID: UserEntity['id'], gameID: string) {
    const user = await this.userModel.findOne({
      ...UserModel.baseOptions,
      attributes: {
        exclude: ['googleToken'],
      },
      where: { id: userID },
    });

    if (!user) {
      return null;
    }

    const game = await user.getGamesJoined({
      where: { id: gameID },
    });

    if (!game) {
      return null;
    }

    if (game.length === 0) {
      return null;
    }

    const users = await game[0].getUsers();

    return users.map((u) => new UserEntity(u.toJSON(), user.toJSON()));
  }

  public async createByGoogle(user: GoogleLogin) {
    const { email, givenName: name, familyName: surname, idToken: googleToken, imageUrl } = user;

    await this.userModel.create({
      email,
      name,
      surname,
      googleToken,
      imageUrl,
    } as UserEntity);
  }

  public async update(user: UserEntity) {
    const { id, name, surname, imageUrl } = user;

    await this.userModel.update(
      {
        name,
        surname,
        imageUrl,
      },
      { where: { id } },
    );
  }
}
