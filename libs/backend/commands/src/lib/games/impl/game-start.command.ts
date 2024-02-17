import { User } from '@sleep-valley/core/interfaces';

export class GameStartCommand {
  constructor(
    public readonly gameID: string,
    public readonly user: User,
  ) {}
}
