import { UserEntity } from '@autronas/backend/entities';

export class ClientsGetQuery {
  constructor(
    public readonly clientID: string,
    public readonly user: UserEntity,
  ) {}
}
