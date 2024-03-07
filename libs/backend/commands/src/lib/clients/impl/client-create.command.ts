import { ClientCreateDTO } from '@autronas/backend/dto';
import { UserEntity } from '@autronas/backend/entities';

export class ClientCreateCommand {
  constructor(
    public readonly client: ClientCreateDTO,
    public readonly user: UserEntity,
  ) {}
}
