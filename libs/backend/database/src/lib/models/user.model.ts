import { User } from '@autronas/core/interfaces';
import {
  FindOptions,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManySetAssociationsMixin,
  STRING,
  TEXT,
  UUID,
  UUIDV4,
} from 'sequelize';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { ClientModel } from './client.model';

@Table({
  tableName: 'Users',
})
export class UserModel extends Model<User> {
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
    unique: true,
    type: STRING,
  })
  declare email: string;

  @Column({
    type: STRING,
  })
  declare name: string;

  @Column({
    type: STRING,
  })
  declare surname: string;

  @Column({
    type: TEXT,
  })
  declare imageUrl: string;

  @Column({
    type: TEXT,
  })
  declare googleToken: string;

  @HasMany(() => ClientModel, 'userID')
  declare clients?: ClientModel[];
  declare getClients?: HasManyGetAssociationsMixin<ClientModel>;
  declare setClients?: HasManySetAssociationsMixin<
    ClientModel,
    ClientModel['id']
  >;
  declare addClients?: HasManyAddAssociationsMixin<
    ClientModel,
    ClientModel['id']
  >;
  declare addClient?: HasManyAddAssociationsMixin<
    ClientModel,
    ClientModel['id']
  >;
  declare createClient?: HasManyCreateAssociationMixin<ClientModel>;
  declare removeClient?: HasManyRemoveAssociationMixin<
    ClientModel,
    ClientModel['id']
  >;
  declare removeClients?: HasManyRemoveAssociationMixin<
    ClientModel,
    ClientModel['id']
  >;
  declare hasClient?: HasManyHasAssociationMixin<
    ClientModel,
    ClientModel['id']
  >;
  declare hasClients?: HasManyHasAssociationsMixin<
    ClientModel,
    ClientModel['id']
  >;
  declare countClients?: HasManyCountAssociationsMixin;

  static get baseOptions(): FindOptions<UserModel> {
    return {};
  }
}
