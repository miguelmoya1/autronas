import { User } from '@sleep-valley/core/interfaces';
import {
  BelongsToManyAddAssociationMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManySetAssociationsMixin,
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
  TEXT,
  UUID,
  UUIDV4,
} from 'sequelize';
import { BelongsToMany, Column, HasMany, Model, Table } from 'sequelize-typescript';
import { CharacterModel } from './character.model';
import { GameModel } from './game.model';
import { VoteModel } from './vote.model';

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

  @HasMany(() => GameModel, {
    foreignKey: 'ownerID',
    as: 'GameOwner',
  })
  declare GameOwners: GameModel[];
  declare getGameOwners: HasManyGetAssociationsMixin<GameModel>;
  declare setGameOwners: HasManySetAssociationsMixin<GameModel, GameModel['id']>;
  declare addGameOwners: HasManyAddAssociationsMixin<GameModel, GameModel['id']>;
  declare addGameOwner: HasManyAddAssociationMixin<GameModel, GameModel['id']>;
  declare createGameOwner: HasManyCreateAssociationMixin<GameModel>;
  declare removeGameOwner: HasManyRemoveAssociationMixin<GameModel, GameModel['id']>;
  declare removeGameOwners: HasManyRemoveAssociationsMixin<GameModel, GameModel['id']>;
  declare hasGameOwner: HasManyHasAssociationMixin<GameModel, GameModel['id']>;
  declare hasGameOwners: HasManyHasAssociationsMixin<GameModel, GameModel['id']>;
  declare countGameOwners: HasManyCountAssociationsMixin;

  @HasMany(() => CharacterModel, {
    foreignKey: 'ownerID',
    as: 'Character',
  })
  declare Characters: CharacterModel[];
  declare getCharacters: HasManyGetAssociationsMixin<CharacterModel>;
  declare setCharacters: HasManySetAssociationsMixin<CharacterModel, CharacterModel['id']>;
  declare addCharacters: HasManyAddAssociationsMixin<CharacterModel, CharacterModel['id']>;
  declare addCharacter: HasManyAddAssociationMixin<CharacterModel, CharacterModel['id']>;
  declare createCharacter: HasManyCreateAssociationMixin<CharacterModel>;
  declare removeCharacter: HasManyRemoveAssociationMixin<CharacterModel, CharacterModel['id']>;
  declare removeCharacters: HasManyRemoveAssociationsMixin<CharacterModel, CharacterModel['id']>;
  declare hasCharacter: HasManyHasAssociationMixin<CharacterModel, CharacterModel['id']>;
  declare hasCharacters: HasManyHasAssociationsMixin<CharacterModel, CharacterModel['id']>;
  declare countCharacters: HasManyCountAssociationsMixin;

  @HasMany(() => VoteModel, {
    foreignKey: 'ownerID',
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

  @BelongsToMany(() => GameModel, {
    through: 'GameUsersJoined',
    foreignKey: 'userID',
    otherKey: 'gameID',
    as: 'GamesJoined',
  })
  declare GamesJoined: GameModel[];
  declare getGamesJoined: BelongsToManyGetAssociationsMixin<GameModel>;
  declare setGamesJoined: BelongsToManySetAssociationsMixin<GameModel, GameModel['id']>;
  declare addGamesJoined: BelongsToManyAddAssociationMixin<GameModel, GameModel['id']>;
  declare createGamesJoined: BelongsToManyCreateAssociationMixin<GameModel>;
  declare removeGamesJoined: BelongsToManyRemoveAssociationMixin<GameModel, GameModel['id']>;
  declare hasGamesJoined: BelongsToManyHasAssociationMixin<GameModel, GameModel['id']>;
  declare countGamesJoined: BelongsToManyCountAssociationsMixin;

  @BelongsToMany(() => GameModel, {
    through: 'UserGameRequests',
    foreignKey: 'userID',
    otherKey: 'gameID',
    as: 'GameRequests',
  })
  declare GameRequests: GameModel[];
  declare getGameRequests: BelongsToManyGetAssociationsMixin<GameModel>;
  declare setGameRequests: BelongsToManySetAssociationsMixin<GameModel, GameModel['id']>;
  declare addGameRequests: BelongsToManyAddAssociationMixin<GameModel, GameModel['id']>;
  declare createGameRequests: BelongsToManyCreateAssociationMixin<GameModel>;
  declare removeGameRequests: BelongsToManyRemoveAssociationMixin<GameModel, GameModel['id']>;
  declare hasGameRequests: BelongsToManyHasAssociationMixin<GameModel, GameModel['id']>;
  declare countGameRequests: BelongsToManyCountAssociationsMixin;

  static get baseOptions(): FindOptions<UserModel> {
    return {};
  }
}
