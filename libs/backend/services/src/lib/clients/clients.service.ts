import { ClientModel } from '@autronas/backend/database';
import {
  ClientCreateDTO,
  ClientUpdateDTO,
  PaginatorDTO,
} from '@autronas/backend/dto';
import { ClientEntity, UserEntity } from '@autronas/backend/entities';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from 'sequelize';

@Injectable()
export class ClientsService {
  private readonly logger = new Logger(ClientsService.name);

  constructor(
    @InjectModel(ClientModel) private readonly clientModel: typeof ClientModel,
  ) {}

  public async getMy(paginator: PaginatorDTO, user: UserEntity) {
    const { limit, offset, sort, direction } = paginator;

    const order: Order | undefined =
      sort && direction ? [[sort, direction]] : undefined;

    const clientDB = await this.clientModel.findAndCountAll({
      ...ClientModel.baseOptions,
      where: { userID: user.id },
      limit,
      offset,
      order,
    });

    if (!clientDB?.count) {
      return {
        hasNext: false,
        hasPrevious: false,
        data: [],
        count: 0,
      };
    }

    return {
      hasNext: paginator.offset + paginator.limit < clientDB.count,
      hasPrevious: paginator.offset > 0,
      data: clientDB.rows.map(
        (client) => new ClientEntity(client.toJSON(), user),
      ),
      count: clientDB.count,
    };
  }

  public async create(client: ClientCreateDTO, user: UserEntity) {
    const { id } = user;
    const { name } = client;

    this.logger.debug('Creating client... ', client.name);

    const clientDB = await this.clientModel.create({
      name,
      userID: id,
    });

    if (!clientDB) {
      return null;
    }

    return new ClientEntity(clientDB.toJSON(), user);
  }

  public async update(
    client: ClientUpdateDTO,
    clientID: string,
    user: UserEntity,
  ) {
    const { id } = user;
    const { name } = client;

    this.logger.debug('Updating client... ', clientID);

    const clientDB = await this.clientModel.update(
      { id: clientID, name },
      { where: { id }, returning: true },
    );

    if (clientDB[0] === 0) {
      return null;
    }

    return new ClientEntity(clientDB[1][0].toJSON(), user);
  }
}
