import { CharacterType, GamePhase, GameStatus } from '@sleep-valley/core/enums';
import { Game } from '@sleep-valley/core/interfaces';
import {
  BOOLEAN,
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyHasAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManySetAssociationsMixin,
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
import { BelongsTo, BelongsToMany, Column, HasMany, Model, Table } from 'sequelize-typescript';
import { CharacterModel } from './character.model';
import { UserModel } from './user.model';
import { VoteModel } from './vote.model';

@Table({
  tableName: 'Games',
})
export class GameModel extends Model<Game> {
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
  declare name: string;

  @Column({
    type: BOOLEAN,
    defaultValue: true,
  })
  declare withWitch: boolean;

  @Column({
    type: BOOLEAN,
    defaultValue: true,
  })
  declare withSeer: boolean;

  @Column({
    type: STRING,
  })
  declare code: string;

  @Column({
    type: ENUM(...Object.values(CharacterType)),
  })
  declare winners: CharacterType;

  @Column({
    type: ENUM(...Object.values(GameStatus)),
    defaultValue: GameStatus.PREPARING,
  })
  declare status: GameStatus;

  @Column({
    type: ENUM(...Object.values(GamePhase)),
    defaultValue: CharacterType.SEER,
  })
  declare phase: GamePhase;

  @BelongsTo(() => UserModel, {
    foreignKey: 'ownerID',
    as: 'Owner',
  })
  declare Owner: UserModel;
  declare getOwner: BelongsToGetAssociationMixin<UserModel>;
  declare setOwner: BelongsToSetAssociationMixin<UserModel, string>;
  declare createOwner: BelongsToCreateAssociationMixin<UserModel>;
  declare ownerID: string;

  @HasMany(() => VoteModel, {
    foreignKey: 'gameID',
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

  @HasMany(() => CharacterModel, {
    foreignKey: 'gameID',
    as: 'Characters',
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

  @BelongsToMany(() => UserModel, {
    through: 'GameUsersJoined',
    foreignKey: 'gameID',
    otherKey: 'userID',
    as: 'Users',
  })
  declare Users: UserModel[];
  declare getUsers: BelongsToManyGetAssociationsMixin<UserModel>;
  declare setUsers: BelongsToManySetAssociationsMixin<UserModel, UserModel['id']>;
  declare addUsers: BelongsToManyAddAssociationsMixin<UserModel, UserModel['id']>;
  declare addUser: BelongsToManyAddAssociationMixin<UserModel, UserModel['id']>;
  declare createUser: BelongsToManyCreateAssociationMixin<UserModel>;
  declare removeUser: BelongsToManyRemoveAssociationMixin<UserModel, UserModel['id']>;
  declare removeUsers: BelongsToManyRemoveAssociationsMixin<UserModel, UserModel['id']>;
  declare hasUser: BelongsToManyHasAssociationMixin<UserModel, UserModel['id']>;
  declare hasUsers: BelongsToManyHasAssociationsMixin<UserModel, UserModel['id']>;
  declare countUsers: BelongsToManyCountAssociationsMixin;

  @BelongsToMany(() => UserModel, {
    through: 'UserGameRequests',
    foreignKey: 'gameID',
    otherKey: 'userID',
    as: 'UserRequests',
  })
  declare UserRequests: UserModel[];
  declare getUserRequests: BelongsToManyGetAssociationsMixin<UserModel>;
  declare setUserRequests: BelongsToManySetAssociationsMixin<UserModel, UserModel['id']>;
  declare addUserRequests: BelongsToManyAddAssociationsMixin<UserModel, UserModel['id']>;
  declare addUserRequest: BelongsToManyAddAssociationMixin<UserModel, UserModel['id']>;
  declare createUserRequest: BelongsToManyCreateAssociationMixin<UserModel>;
  declare removeUserRequest: BelongsToManyRemoveAssociationMixin<UserModel, UserModel['id']>;
  declare removeUserRequests: BelongsToManyRemoveAssociationsMixin<UserModel, UserModel['id']>;
  declare hasUserRequest: BelongsToManyHasAssociationMixin<UserModel, UserModel['id']>;
  declare hasUserRequests: BelongsToManyHasAssociationsMixin<UserModel, UserModel['id']>;
  declare countUserRequests: BelongsToManyCountAssociationsMixin;

  static get baseOptions(): FindOptions<GameModel> {
    return {
      include: [
        {
          model: UserModel,
          as: 'Users',
          attributes: ['id'],
        },
        {
          model: UserModel,
          as: 'UserRequests',
          attributes: ['id'],
        },
        {
          model: UserModel,
          as: 'Owner',
          attributes: ['id'],
        },
        {
          model: VoteModel,
          as: 'Votes',
          attributes: ['id', 'ownerID', 'isConfirmed'],
        },
        {
          model: CharacterModel,
          as: 'Characters',
          attributes: ['id', 'ownerID', 'type', 'isAlive', 'potionKillUsed', 'potionReviveUsed'],
        },
      ],
    };
  }
}
