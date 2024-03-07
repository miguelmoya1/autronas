import { ClientUpdateDTO } from '@autronas/backend/dto';
import { UserEntity } from '@autronas/backend/entities';

export class ClientUpdateCommand {
  constructor(
    public readonly client: ClientUpdateDTO,
    public readonly clientID: string,
    public readonly user: UserEntity,
  ) {}
}
