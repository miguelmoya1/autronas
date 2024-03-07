import { PaginatorDTO } from '@autronas/backend/dto';
import { UserEntity } from '@autronas/backend/entities';

export class ClientsGetMyQuery {
  constructor(
    public readonly paginator: PaginatorDTO,
    public readonly user: UserEntity,
  ) {}
}
