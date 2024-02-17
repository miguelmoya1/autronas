import { Vote } from '@sleep-valley/core/interfaces';
import {
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  FindOptions,
  UUID,
  UUIDV4,
} from 'sequelize';
import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';
import { CharacterModel } from './character.model';
import { GameModel } from './game.model';
import { UserModel } from './user.model';

@Table({
  tableName: 'Votes',
})
export class VoteModel extends Model<Vote> {
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
    defaultValue: false,
  })
  declare isConfirmed: boolean;

  @Column({
    allowNull: false,
    defaultValue: false,
  })
  declare isSkipped: boolean;

  @BelongsTo(() => UserModel, {
    foreignKey: 'ownerID',
    as: 'Owner',
  })
  declare Owner: UserModel;
  declare getOwner: BelongsToGetAssociationMixin<UserModel>;
  declare setOwner: BelongsToSetAssociationMixin<UserModel, string>;
  declare createOwner: BelongsToCreateAssociationMixin<UserModel>;
  declare ownerID: string;

  @BelongsTo(() => CharacterModel, {
    foreignKey: 'characterID',
    as: 'Character',
  })
  declare Character: CharacterModel;
  declare getCharacter: BelongsToGetAssociationMixin<CharacterModel>;
  declare setCharacter: BelongsToSetAssociationMixin<CharacterModel, string>;
  declare createCharacter: BelongsToCreateAssociationMixin<CharacterModel>;
  declare characterID: string;

  @BelongsTo(() => GameModel, {
    foreignKey: 'gameID',
    as: 'Game',
  })
  declare Game: GameModel;
  declare getGame: BelongsToGetAssociationMixin<GameModel>;
  declare setGame: BelongsToSetAssociationMixin<GameModel, string>;
  declare createGame: BelongsToCreateAssociationMixin<GameModel>;
  declare gameID: string;

  static get baseOptions(): FindOptions<VoteModel> {
    return {
      include: [
        {
          model: UserModel,
          as: 'Owner',
          attributes: ['id'],
        },
        {
          model: CharacterModel,
          as: 'Character',
          attributes: ['id'],
        },
        {
          model: GameModel,
          as: 'Game',
          attributes: ['id'],
        },
      ],
    };
  }
}
