import {
  UserLoggedInEvent,
  UserRehydratedEvent,
} from '@autronas/backend/events';
import { User } from '@autronas/core/interfaces';
import { AggregateRoot } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

class UserPermissions implements UserPermissions {
  @ApiProperty()
  declare canEdit: boolean;

  @ApiProperty()
  declare canDelete: boolean;

  @ApiProperty()
  declare canSeeDetails: boolean;

  constructor({ isOwner }: UserEntity) {
    this.canEdit = isOwner ?? false;
    this.canDelete = isOwner ?? false;
    this.canSeeDetails = isOwner ?? false;
  }
}

export class UserEntity extends AggregateRoot implements User {
  @ApiProperty()
  public declare id: string;

  @ApiProperty()
  public declare email: string;

  @ApiProperty()
  public declare name: string;

  @ApiProperty()
  public declare surname: string;

  @ApiProperty()
  public declare imageUrl: string;

  @ApiProperty()
  public declare isOwner: boolean;

  @ApiProperty()
  public declare permissions: UserPermissions;

  @Exclude()
  public declare googleToken: string;

  @Exclude()
  public declare createdAt: Date;

  @Exclude()
  public declare updatedAt: Date;

  @Exclude()
  public declare deletedAt: Date | null;

  constructor(partial: Partial<UserEntity>, user: Partial<UserEntity>) {
    super();

    this.assign(partial);

    this.isOwner = this.id === user.id;

    this.permissions = new UserPermissions(this);
  }

  public login() {
    this.apply(new UserLoggedInEvent(this.id));

    return this;
  }

  public rehydrate() {
    this.apply(new UserRehydratedEvent(this.id));

    return this;
  }

  public update(user: Partial<UserEntity>) {
    this.assign(user);

    return this;

    // this.apply(new UserUpdatedEvent(this));
  }

  private assign(user: Partial<UserEntity>) {
    this.id = user.id ?? this.id;
    this.email = user.email ?? this.email;
    this.name = user.name ?? this.name;
    this.surname = user.surname ?? this.surname;
    this.imageUrl = user.imageUrl ?? this.imageUrl;
    this.googleToken = user.googleToken ?? this.googleToken;
    this.createdAt = user.createdAt ?? this.createdAt;
    this.deletedAt = user.deletedAt ?? this.deletedAt;
    this.updatedAt = user.updatedAt ?? this.updatedAt;

    return this;
  }
}
