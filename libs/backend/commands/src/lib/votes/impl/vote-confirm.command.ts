import { User } from '@sleep-valley/core/interfaces';

export class VoteConfirmCommand {
  constructor(
    public readonly gameID: string,
    public readonly user: User,
  ) {}
}
