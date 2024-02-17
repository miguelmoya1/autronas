import { User } from '@autronas/core/interfaces';
import { FindOptions, STRING, TEXT, UUID, UUIDV4 } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

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

  static get baseOptions(): FindOptions<UserModel> {
    return {};
  }
}
