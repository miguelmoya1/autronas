import { AggregateRoot } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import {
  GameCharactersCreatedEvent,
  GameCodeCreatedEvent,
  GameCreatedEvent,
  GameDeclinedEvent,
  GameFinishedEvent,
  GameJoinedEvent,
  GamePhaseChangedEvent,
  GameStartedEvent,
  GameUserRequestedEvent,
  VoteClearedEvent,
} from '@sleep-valley/backend/events';
import { CharacterType, GamePhase, GameStatus } from '@sleep-valley/core/enums';
import { Game, GamePermissions, User } from '@sleep-valley/core/interfaces';
import { Exclude } from 'class-transformer';
import { CharacterEntity } from '../characters/character.entity';
import { VoteEntity } from '../votes/vote.entity';

class GamePermissionsEntity implements GamePermissions {
  @ApiProperty()
  public declare canAddUsers: boolean;

  @ApiProperty()
  public declare canStartGame: boolean;

  @ApiProperty()
  public declare canRequestJoin: boolean;

  constructor({ isOwner, hasEnoughUsers, status, Users }: GameEntity, userID: string) {
    this.canAddUsers = isOwner;

    const isGamePreparing = status === GameStatus.PREPARING;

    this.canStartGame = isOwner && hasEnoughUsers && isGamePreparing;
    this.canRequestJoin = !isOwner && isGamePreparing && !Users?.some((u) => u.id === userID);
  }
}

export class GameEntity extends AggregateRoot implements Game {
  @ApiProperty()
  public declare id: string;

  @ApiProperty()
  public declare name: string;

  @ApiProperty()
  public declare code: string;

  @ApiProperty()
  public declare withWitch: boolean;

  @ApiProperty()
  public declare withSeer: boolean;

  @ApiProperty()
  public declare imageUrl: string;

  @ApiProperty({
    nullable: true,
  })
  public declare winners: CharacterType | null;

  @ApiProperty({
    enum: GameStatus,
    enumName: 'GameStatus',
    example: GameStatus.PREPARING,
  })
  public declare status: GameStatus;

  @ApiProperty({
    enum: GamePhase,
    enumName: 'GamePhase',
    example: GamePhase.WEREWOLF,
  })
  public declare phase: GamePhase;

  @ApiProperty()
  public declare hasCharacters: boolean;

  @ApiProperty()
  public declare isOwner: boolean;

  @ApiProperty()
  public declare hasEnoughUsers: boolean;

  @ApiProperty()
  public declare permissions: GamePermissionsEntity;

  @Exclude()
  public declare Owner: Pick<User, 'id'>;

  @Exclude()
  public declare ownerID: string;

  @Exclude()
  public declare Users: Pick<User, 'id'>[];

  @Exclude()
  public declare UserRequests: Pick<User, 'id'>[];

  @Exclude()
  public declare Votes: Pick<VoteEntity, 'id' | 'ownerID' | 'isConfirmed'>[];

  @Exclude()
  public declare Characters: Pick<
    CharacterEntity,
    'id' | 'ownerID' | 'type' | 'isAlive' | 'potionKillUsed' | 'potionReviveUsed'
  >[];

  @Exclude()
  public declare createdAt: Date;

  @Exclude()
  public declare deletedAt: Date;

  @Exclude()
  public declare updatedAt: Date;

  constructor(game: Partial<GameEntity>, user: Partial<User>) {
    super();

    this.assign(game);

    this.hasCharacters = this.Characters?.length > 0;
    this.isOwner = this.ownerID === user.id;
    this.hasEnoughUsers = this.Users?.length >= 3;

    if (user.id) {
      this.permissions = new GamePermissionsEntity(this, user.id);
    }
  }

  public static generateRandomCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  public create(id: string, user: User) {
    this.id = id;
    this.ownerID = user.id;
    this.Users = [{ id: user.id }];

    if (this.withSeer) {
      this.phase = GamePhase.SEER;
    } else {
      this.phase = GamePhase.WEREWOLF;
    }

    this.apply(new GameCreatedEvent(this.id));

    return this;
  }

  public setCode(code: string) {
    this.code = code;

    this.apply(new GameCodeCreatedEvent(this.id));

    return this;
  }

  public hasUser(user: User) {
    return this.Users.some((u) => u.id === user.id);
  }

  public hasUserRequest(user: User) {
    return this.UserRequests.some((u) => u.id === user.id);
  }

  public requestJoin(user: User) {
    this.UserRequests.push({ id: user.id });

    this.apply(new GameUserRequestedEvent(this.id));

    return this;
  }

  public join(user: User) {
    this.Users.push({ id: user.id });

    this.apply(new GameJoinedEvent(this.id));

    return this;
  }

  public decline(user: User) {
    this.UserRequests = this.UserRequests.filter((u) => u.id !== user.id);

    this.apply(new GameDeclinedEvent(this.id));

    return this;
  }

  public start() {
    this.status = GameStatus.STARTED;

    this.apply(new GameStartedEvent(this.id));

    return this;
  }

  public finish(winners: CharacterType) {
    this.status = GameStatus.FINISHED;
    this.winners = winners;

    this.apply(new GameFinishedEvent(this.id));

    return this;
  }

  public charactersCreated(characters: CharacterEntity[]) {
    this.apply(
      new GameCharactersCreatedEvent(
        this.id,
        characters.map((c) => c.id),
      ),
    );

    return this;
  }

  public nextPhase(characters: CharacterEntity[]) {
    const witch = characters.find((c) => c.type === CharacterType.WITCH);
    const seer = characters.find((c) => c.type === CharacterType.SEER);

    const allCharactersAreSeen = characters.every((c) => c.seenBySeer);

    switch (this.phase) {
      case GamePhase.SEER:
        this.phase = GamePhase.WEREWOLF;

        break;
      case GamePhase.WEREWOLF:
        if (witch?.isAlive && !(witch?.potionKillUsed || witch?.potionReviveUsed)) {
          this.phase = GamePhase.WITCH;
        } else {
          this.phase = GamePhase.VILLAGER;
        }

        break;
      case GamePhase.WITCH:
        this.phase = GamePhase.VILLAGER;

        break;
      case GamePhase.VILLAGER:
        if (!seer?.isAlive || allCharactersAreSeen) {
          this.phase = GamePhase.WEREWOLF;
        } else {
          this.phase = GamePhase.SEER;
        }

        break;
    }

    this.apply(new GamePhaseChangedEvent(this.id));

    return this;
  }

  public clearVotes() {
    this.Votes = [];

    this.apply(new VoteClearedEvent(this.id));

    return this;
  }

  private assign(game: Partial<GameEntity>) {
    this.id = game.id ?? this.id;
    this.name = game.name ?? this.name;
    this.withWitch = game.withWitch ?? this.withWitch;
    this.withSeer = game.withSeer ?? this.withSeer;
    this.code = game.code ?? this.code;
    this.imageUrl = game.imageUrl ?? this.imageUrl;
    this.winners = game.winners ?? this.winners;
    this.status = game.status ?? this.status ?? GameStatus.PREPARING;
    this.phase = game.phase ?? this.phase ?? GamePhase.WEREWOLF;
    this.ownerID = game.ownerID ?? this.ownerID;
    this.createdAt = game.createdAt ?? this.createdAt;
    this.deletedAt = game.deletedAt ?? this.deletedAt;
    this.updatedAt = game.updatedAt ?? this.updatedAt;
    this.Owner = game.Owner ?? this.Owner;
    this.Users = game.Users ?? this.Users;
    this.UserRequests = game.UserRequests ?? this.UserRequests;
    this.Votes = game.Votes ?? this.Votes;
    this.Characters = game.Characters ?? this.Characters;
  }
}
