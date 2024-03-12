import { Client, User } from '@autronas/core/interfaces';
import { AggregateRoot } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Paginated } from '../common/paginated.entity';
import { UserEntity } from '../users/user.entity';

class ClientPermissions implements ClientPermissions {
  @ApiProperty()
  declare canEdit: boolean;

  @ApiProperty()
  declare canDelete: boolean;

  @ApiProperty()
  declare canSeeDetails: boolean;

  constructor({ isOwner }: ClientEntity) {
    this.canEdit = isOwner ?? false;
    this.canDelete = isOwner ?? false;
    this.canSeeDetails = isOwner ?? false;
  }
}

export class ClientEntity extends AggregateRoot implements Client {
  @ApiProperty()
  public declare id: string;

  @ApiProperty()
  public declare name: string;

  @ApiProperty()
  public declare surname: string;

  @ApiProperty()
  public declare email: string;

  @ApiProperty()
  public declare personalID: string;

  @ApiProperty()
  public declare phoneNumber: string;

  @ApiProperty()
  public declare isBusiness: boolean;

  @ApiProperty()
  public declare isOwner: boolean;

  @ApiProperty()
  public declare permissions: ClientPermissions;

  @ApiProperty()
  public declare userID: string;

  @ApiProperty()
  public declare createdAt: Date;

  @Exclude()
  public declare updatedAt: Date;

  @Exclude()
  public declare deletedAt: Date | null;

  constructor(partial: Partial<ClientEntity>, user: Partial<UserEntity>) {
    super();

    this.assign(partial);

    this.isOwner = this.id === user.id;

    this.permissions = new ClientPermissions(this);
  }

  public create(user: User) {
    this.userID = user.id;

    // this.apply(new ClientCreatedEvent(this));
    return this;
  }

  public update(user: Partial<ClientEntity>) {
    this.assign(user);

    // this.apply(new ClientUpdatedEvent(this));
    return this;
  }

  private assign(client: Partial<ClientEntity>) {
    this.id = client.id ?? this.id;
    this.name = client.name ?? this.name;
    this.surname = client.surname ?? this.surname;
    this.email = client.email ?? this.email;
    this.personalID = client.personalID ?? this.personalID;
    this.phoneNumber = client.phoneNumber ?? this.phoneNumber;
    this.isBusiness = client.isBusiness ?? this.isBusiness;

    this.userID = client.userID ?? this.userID;
    this.isOwner = client.isOwner ?? this.isOwner;
    this.createdAt = client.createdAt ?? this.createdAt;
    this.deletedAt = client.deletedAt ?? this.deletedAt;
    this.updatedAt = client.updatedAt ?? this.updatedAt;

    return this;
  }
}

export class ClientsPaginatedEntity extends Paginated(ClientEntity) {}
