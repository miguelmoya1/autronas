import { ClientCreateDTO } from '@autronas/backend/dto';
import { Client } from '@autronas/core/interfaces';
import {
  BOOLEAN,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  FindOptions,
  STRING,
  TEXT,
  UUID,
  UUIDV4,
} from 'sequelize';
import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';
import { UserModel } from './user.model';

@Table({
  tableName: 'Clients',
})
export class ClientModel extends Model<Client, ClientCreateDTO> {
  @Column({
    allowNull: false,
    unique: true,
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  })
  declare id: string;

  @Column({
    type: STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: STRING,
    allowNull: false,
  })
  declare surname: string;

  @Column({
    type: STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: STRING,
    allowNull: false,
    unique: true,
  })
  declare personalID: string;

  @Column({
    type: STRING,
  })
  declare phoneNumber: string;

  @Column({
    type: BOOLEAN,
    allowNull: false,
  })
  declare isBusiness: boolean;

  @Column({
    type: TEXT,
  })
  declare notes: string;

  @BelongsTo(() => UserModel, 'userID')
  declare user?: UserModel;
  declare hasUser?: BelongsToGetAssociationMixin<UserModel>;
  declare setUser?: BelongsToSetAssociationMixin<UserModel, UserModel['id']>;
  // declare createUser?: BelongsToCreateAssociationMixin<UserModel>; // ! DO NOT USE THIS
  declare userID?: UserModel['id'];

  static get baseOptions(): FindOptions<ClientModel> {
    return {};
  }
}
