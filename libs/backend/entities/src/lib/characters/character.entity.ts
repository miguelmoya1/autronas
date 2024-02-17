import { AggregateRoot } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import {
  CharacterKilledEvent,
  CharacterRevivedEvent,
  CharacterSeenEvent,
  CharacterWitchSkippedEvent,
} from '@sleep-valley/backend/events';
import { CharacterType, GamePhase, GameStatus } from '@sleep-valley/core/enums';
import { Character, CharacterPermissions, Game, User, Vote } from '@sleep-valley/core/interfaces';
import { Exclude, Transform } from 'class-transformer';

class CharacterPermissionsEntity implements CharacterPermissions {
  @ApiProperty()
  public canSeeDetails = false;

  @ApiProperty()
  public canVoteAsVillager = false;

  @ApiProperty()
  public canKillAsWerewolf = false;

  @ApiProperty()
  public canKillAsWitch = false;

  @ApiProperty()
  public canReviveAsWitch = false;

  @ApiProperty()
  public canSeeAsSeer = false;

  constructor(character: CharacterEntity, characterOwner?: Partial<Character>) {
    const { isOwner, Game, Votes, ownerID, isAlive, type, seenBySeer, potionKillUsed, potionReviveUsed } = character;

    const gameIsFinished = Game?.status === GameStatus.FINISHED;
    const gameIsStarted = Game?.status === GameStatus.STARTED;

    const isVillagerPhase = Game?.phase === GamePhase.VILLAGER;
    const isWerewolfPhase = Game?.phase === GamePhase.WEREWOLF;
    const isWitchPhase = Game?.phase === GamePhase.WITCH;
    const isSeerPhase = Game?.phase === GamePhase.SEER;

    const characterIsWerewolf = type === CharacterType.WEREWOLF;
    const characterIsWitch = type === CharacterType.WITCH;
    const characterIsSeer = type === CharacterType.SEER;

    const hasVoted = Votes?.some((vote) => vote.Owner.id === ownerID);

    this.canSeeDetails =
      isOwner || gameIsFinished || !isAlive || (seenBySeer && characterOwner?.type === CharacterType.SEER);

    if (isOwner && gameIsStarted && isAlive) {
      this.canVoteAsVillager = isVillagerPhase && !hasVoted;

      this.canKillAsWerewolf = isWerewolfPhase && characterIsWerewolf;

      this.canKillAsWitch = isWitchPhase && !potionKillUsed && characterIsWitch;

      this.canReviveAsWitch = isWitchPhase && !potionReviveUsed && characterIsWitch;

      this.canSeeAsSeer = isSeerPhase && characterIsSeer;
    }
  }
}

export class CharacterEntity extends AggregateRoot implements Character {
  @ApiProperty()
  public declare id: string;

  @ApiProperty()
  public declare imageUrl: string;

  @ApiProperty()
  public declare isAlive: boolean;

  @ApiProperty()
  public declare potionReviveUsed: boolean;

  @ApiProperty()
  public declare potionKillUsed: boolean;

  @ApiProperty()
  public declare seenBySeer: boolean;

  @ApiProperty()
  public declare isOwner: boolean;

  @ApiProperty()
  @Transform(({ value, obj }) => {
    if (obj.permissions.canSeeDetails) return value;
    return CharacterType.VILLAGER;
  })
  public declare type: CharacterType;

  @ApiProperty()
  public declare killedBy: CharacterType | null;

  @ApiProperty()
  public declare permissions: CharacterPermissionsEntity;

  @ApiProperty()
  public declare Owner: Pick<User, 'id' | 'name' | 'surname' | 'imageUrl'>;

  @ApiProperty()
  public declare Votes: Pick<Vote, 'id' | 'Owner'>[];

  @Exclude()
  public declare ownerID: string;

  @Exclude()
  public declare Game: Pick<Game, 'id' | 'status' | 'phase'>;

  @Exclude()
  public declare gameID: string;

  @Exclude()
  public declare createdAt: Date;

  @Exclude()
  public declare deletedAt: Date;

  @Exclude()
  public declare updatedAt: Date;

  constructor(character: Partial<Character>, user: Partial<User>, characterOwner?: Partial<Character>) {
    super();

    this.assign(character);

    this.isOwner = this.ownerID === user.id;
    this.permissions = new CharacterPermissionsEntity(this, characterOwner);
  }

  public static generateRandomCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  public kill(by: CharacterType) {
    this.isAlive = false;
    this.killedBy = by;
    this.potionKillUsed = true;

    this.apply(new CharacterKilledEvent(this.gameID));

    return this;
  }

  public revive() {
    this.isAlive = true;
    this.killedBy = null;
    this.potionReviveUsed = true;

    this.apply(new CharacterRevivedEvent(this.gameID));

    return this;
  }

  public skip() {
    this.apply(new CharacterWitchSkippedEvent(this.gameID));

    return this;
  }

  public setSeenBySeer() {
    this.seenBySeer = true;

    this.apply(new CharacterSeenEvent(this.gameID));

    return this;
  }

  private assign(character: Partial<Character>) {
    this.id = character.id ?? this.id;
    this.imageUrl = character.imageUrl ?? this.imageUrl;
    this.isAlive = character.isAlive ?? this.isAlive ?? true;
    this.seenBySeer = character.seenBySeer ?? this.seenBySeer ?? false;
    this.type = character.type ?? this.type ?? CharacterType.VILLAGER;
    this.potionReviveUsed = character.potionReviveUsed ?? this.potionReviveUsed ?? false;
    this.potionKillUsed = character.potionKillUsed ?? this.potionKillUsed ?? false;
    this.killedBy = character.killedBy ?? this.killedBy;
    this.ownerID = character.ownerID ?? this.ownerID;
    this.gameID = character.gameID ?? this.gameID;
    this.createdAt = character.createdAt ?? this.createdAt;
    this.deletedAt = character.deletedAt ?? this.deletedAt;
    this.updatedAt = character.updatedAt ?? this.updatedAt;
    this.Owner = character.Owner ?? this.Owner;
    this.Game = character.Game ?? this.Game;
    this.Votes = character.Votes ?? this.Votes;
  }
}
