import { User } from '@sleep-valley/core/interfaces';

export class GameDeclineCommand {
  constructor(
    public readonly gameID: string,
    public readonly userID: string,
    public readonly user: User,
  ) {}
}
