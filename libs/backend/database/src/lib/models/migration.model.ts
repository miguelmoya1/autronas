import { STRING } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'Migrations',
})
export class MigrationsModel extends Model {
  @Column({
    allowNull: false,
    unique: true,
    primaryKey: true,
    type: STRING,
  })
  declare name: string;
}
