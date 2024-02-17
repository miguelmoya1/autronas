import { User } from '@sleep-valley/core/interfaces';

export class GameGetQuery {
  constructor(
    public readonly gameID: string,
    public readonly user: User,
  ) {}
}
