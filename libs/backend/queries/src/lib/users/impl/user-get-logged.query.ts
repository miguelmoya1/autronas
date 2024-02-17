import { User } from '@autronas/core/interfaces';

export class UserGetLoggedQuery {
  constructor(public readonly user: User) {}
}
