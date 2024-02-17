import { UserEntity } from '@autronas/backend/entities';

export class AuthRehydrateQuery {
  constructor(public readonly user: UserEntity) {}
}
