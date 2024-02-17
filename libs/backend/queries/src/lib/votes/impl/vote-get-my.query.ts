import { User } from '@sleep-valley/core/interfaces';

export class VoteGetMyQuery {
  constructor(
    public readonly gameID: string,
    public readonly user: User,
  ) {}
}
