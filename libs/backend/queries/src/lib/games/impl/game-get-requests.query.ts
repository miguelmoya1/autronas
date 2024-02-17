import { User } from '@sleep-valley/core/interfaces';

export class GameGetRequestsQuery {
  constructor(
    public readonly gameID: string,
    public readonly user: User,
  ) {}
}
