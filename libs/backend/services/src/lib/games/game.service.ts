import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GameModel } from '@sleep-valley/backend/database';
import { GameEntity } from '@sleep-valley/backend/entities';
import { GameStatus } from '@sleep-valley/core/enums';
import { User } from '@sleep-valley/core/interfaces';
import { Op } from 'sequelize';

@Injectable()
export class GameService {
  private readonly logger = new Logger(GameService.name);
  constructor(@InjectModel(GameModel) private readonly gameModel: typeof GameModel) {}

  public async getAll(user: Partial<User>) {
    // get only games that are not finished and the user is joined

    const games = await this.gameModel.findAll({
      ...GameModel.baseOptions,
      where: { status: { [Op.ne]: GameStatus.FINISHED } },
      include: [
        {
          association: 'Users',
          where: { id: user.id },
        },
      ],
    });

    return games.map((game) => new GameEntity(game?.toJSON(), user));
  }

  public async get(id: GameModel['id'], user: Partial<User>): Promise<GameEntity | null> {
    const game = await this.gameModel.findOne({
      ...GameModel.baseOptions,
      where: { id },
    });

    return game ? new GameEntity(game.toJSON(), user) : null;
  }

  public async getByCode(code: GameModel['code'], user: Partial<User>): Promise<GameEntity | null> {
    const game = await this.gameModel.findOne({
      ...GameModel.baseOptions,
      where: { code: code.toUpperCase() },
    });

    return game ? new GameEntity(game.toJSON(), user) : null;
  }

  public async create(game: GameEntity) {
    this.logger.debug('Create...');
    return await this.gameModel.create({ ...game });
  }

  public async save(game: GameEntity) {
    this.logger.debug('Save...');
    await this.gameModel.update(game, {
      where: { id: game.id },
    });
  }

  public async isUniqueCode(code: string) {
    this.logger.debug('IsUniqueCode...');
    const games = await this.gameModel.count({ where: { code } });

    return games === 0;
  }

  public async requestJoin(id: GameModel['id'], userID: string) {
    this.logger.debug('RequestJoin...');
    const game = await this.gameModel.findOne({ where: { id } });

    if (!game) {
      return;
    }

    await game.addUserRequest(userID);
  }

  public async join(id: GameModel['id'], userID: string) {
    this.logger.debug('Join...');
    const game = await this.gameModel.findOne({ where: { id } });

    if (!game) {
      return;
    }

    // TODO: add transaction
    await game.addUser(userID);

    await game.removeUserRequest(userID);
  }

  public async decline(id: GameModel['id'], userID: string) {
    this.logger.debug('Decline...');
    const game = await this.gameModel.findOne({ where: { id } });

    if (!game) {
      return;
    }

    await game.removeUserRequest(userID);
  }

  public async isInGame(id: GameModel['id'], userID: string) {
    this.logger.debug('IsInGame...');
    const game = await this.gameModel.findOne({ where: { id } });

    return !!(await game?.hasUser(userID));
  }

  public async getRequests(id: GameModel['id']) {
    this.logger.debug('GetRequests...');
    const game = await this.gameModel.findOne({
      ...GameModel.baseOptions,
      where: { id },
    });

    const users = await game?.getUserRequests();

    return users ? users.map((user) => user.toJSON()) : [];
  }
}
