import { ClientCreateDTO } from '@autronas/backend/dto';
import { Client } from '@autronas/core/interfaces';
import {
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  FindOptions,
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
    allowNull: false,
  })
  declare name: string;

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