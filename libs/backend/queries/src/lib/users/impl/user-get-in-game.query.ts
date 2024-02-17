import { User } from '@sleep-valley/core/interfaces';

export class UserGetInGameQuery {
  constructor(
    public readonly gameID: string,
    public readonly user: User,
  ) {}
}
