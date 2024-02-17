import { AggregateRoot } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { VoteConfirmedEvent, VoteCreatedEvent } from '@sleep-valley/backend/events';
import { Vote, VotePermissions } from '@sleep-valley/core/interfaces';
import { Exclude } from 'class-transformer';
import { CharacterEntity } from '../characters/character.entity';
import { GameEntity } from '../games/game.entity';

class VotePermissionsEntity implements VotePermissions {
  @ApiProperty()
  public declare canDelete: boolean;

  constructor() {
    this.canDelete = false;
  }
}

export class VoteEntity extends AggregateRoot implements Vote {
  @ApiProperty()
  public declare id: string;

  @ApiProperty()
  public declare permissions: VotePermissionsEntity;

  @ApiProperty()
  public declare isConfirmed: boolean;

  @ApiProperty()
  public declare isSkipped: boolean;

  @Exclude()
  public declare Owner: Vote['Owner'];

  @ApiProperty()
  public declare ownerID: string;

  @Exclude()
  public declare Character: Pick<CharacterEntity, 'id'>;

  @ApiProperty()
  public declare characterID: string;

  @Exclude()
  public declare Game: Pick<GameEntity, 'id'>;

  @ApiProperty()
  public declare gameID: string;

  @Exclude()
  public declare createdAt: Date;

  @Exclude()
  public declare deletedAt: Date;

  @Exclude()
  public declare updatedAt: Date;

  constructor(vote: Partial<VoteEntity>) {
    super();

    this.assign(vote);

    this.permissions = new VotePermissionsEntity();
  }

  public create() {
    this.apply(new VoteCreatedEvent(this.gameID));
  }

  public confirm() {
    this.isConfirmed = true;

    this.apply(new VoteConfirmedEvent(this.gameID));
  }

  public delete() {
    this.deletedAt = new Date();
  }

  private assign(vote: Partial<VoteEntity>) {
    this.id = vote.id ?? this.id;
    this.ownerID = vote.ownerID ?? this.ownerID;
    this.characterID = vote.characterID ?? this.characterID;
    this.gameID = vote.gameID ?? this.gameID;

    this.isConfirmed = vote.isConfirmed ?? this.isConfirmed;
    this.isSkipped = vote.isSkipped ?? this.isSkipped ?? false;

    this.Owner = vote.Owner ?? this.Owner;
    this.Character = vote.Character ?? this.Character;
    this.Game = vote.Game ?? this.Game;

    this.createdAt = vote.createdAt ?? this.createdAt;
    this.deletedAt = vote.deletedAt ?? this.deletedAt;
    this.updatedAt = vote.updatedAt ?? this.updatedAt;
  }
}
