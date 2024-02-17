import { UserEntity } from '@sleep-valley/backend/entities';

export class AuthIsLoggedQuery {
  constructor(public readonly user: UserEntity) {}
}
