import { UserEntity } from '@autronas/backend/entities';

export class AuthIsLoggedQuery {
  constructor(public readonly user: UserEntity) {}
}
