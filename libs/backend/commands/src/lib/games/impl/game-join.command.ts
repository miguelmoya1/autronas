import { User } from '@sleep-valley/core/interfaces';

export class GameJoinCommand {
  constructor(
    public readonly gameID: string,
    public readonly userID: string,
    public readonly user: User,
  ) {}
}
