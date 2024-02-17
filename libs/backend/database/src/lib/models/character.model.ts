import { CharacterType } from '@sleep-valley/core/enums';
import { Character } from '@sleep-valley/core/interfaces';
import {
  BOOLEAN,
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  ENUM,
  FindOptions,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
  STRING,
  UUID,
  UUIDV4,
} from 'sequelize';
import { BelongsTo, Column, HasMany, Model, Table } from 'sequelize-typescript';
import { GameModel } from './game.model';
import { UserModel } from './user.model';
import { VoteModel } from './vote.model';

@Table({
  tableName: 'Characters',
})
export class CharacterModel extends Model<Character> {
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
  })
  declare imageUrl: string;

  @Column({
    type: BOOLEAN,
    defaultValue: true,
  })
  declare isAlive: boolean;

  @Column({
    type: BOOLEAN,
    defaultValue: false,
  })
  declare potionReviveUsed: boolean;

  @Column({
    type: BOOLEAN,
    defaultValue: false,
  })
  declare potionKillUsed: boolean;

  @Column({
    type: BOOLEAN,
    defaultValue: false,
  })
  declare seenBySeer: boolean;

  @Column({
    type: ENUM(...Object.values(CharacterType)),
  })
  declare killedBy: CharacterType;

  @Column({
    type: ENUM(...Object.values(CharacterType)),
    defaultValue: CharacterType.VILLAGER,
  })
  declare type: CharacterType;

  @BelongsTo(() => UserModel, {
    foreignKey: 'ownerID',
    as: 'Owner',
  })
  declare Owner: UserModel;
  declare getOwner: BelongsToGetAssociationMixin<UserModel>;
  declare setOwner: BelongsToSetAssociationMixin<UserModel, string>;
  declare createOwner: BelongsToCreateAssociationMixin<UserModel>;
  declare ownerID: string;

  @BelongsTo(() => GameModel, {
    foreignKey: 'gameID',
    as: 'Game',
  })
  declare Game: GameModel;
  declare getGame: BelongsToGetAssociationMixin<GameModel>;
  declare setGame: BelongsToSetAssociationMixin<GameModel, string>;
  declare createGame: BelongsToCreateAssociationMixin<GameModel>;
  declare gameID: string;

  @HasMany(() => VoteModel, {
    foreignKey: 'characterID',
    as: 'Votes',
  })
  declare Votes: VoteModel[];
  declare getVotes: HasManyGetAssociationsMixin<VoteModel>;
  declare setVotes: HasManySetAssociationsMixin<VoteModel, VoteModel['id']>;
  declare addVotes: HasManyAddAssociationsMixin<VoteModel, VoteModel['id']>;
  declare addVote: HasManyAddAssociationMixin<VoteModel, VoteModel['id']>;
  declare createVote: HasManyCreateAssociationMixin<VoteModel>;
  declare removeVote: HasManyRemoveAssociationMixin<VoteModel, VoteModel['id']>;
  declare removeVotes: HasManyRemoveAssociationsMixin<VoteModel, VoteModel['id']>;
  declare hasVote: HasManyHasAssociationMixin<VoteModel, VoteModel['id']>;
  declare hasVotes: HasManyHasAssociationsMixin<VoteModel, VoteModel['id']>;
  declare countVotes: HasManyCountAssociationsMixin;

  static get baseOptions(): FindOptions<CharacterModel> {
    return {
      include: [
        {
          model: UserModel,
          as: 'Owner',
          attributes: ['id', 'name', 'surname', 'imageUrl'],
        },
        {
          model: GameModel,
          as: 'Game',
          attributes: ['id', 'status', 'phase'],
        },
        {
          model: VoteModel,
          as: 'Votes',
          attributes: ['id'],
          required: false,
          include: [
            {
              model: UserModel,
              as: 'Owner',
              attributes: ['id', 'name', 'surname', 'imageUrl'],
            },
          ],
        },
      ],
    };
  }
}
