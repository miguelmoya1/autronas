import { UserEntity } from '@autronas/backend/entities';

export class UserGetLoggedQuery {
  constructor(public readonly user: UserEntity) {}
}
