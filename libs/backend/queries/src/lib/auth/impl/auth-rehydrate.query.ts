import { UserEntity } from '@sleep-valley/backend/entities';

export class AuthRehydrateQuery {
  constructor(public readonly user: UserEntity) {}
}
