import { VoteCreate } from '@sleep-valley/backend/dto';
import { User } from '@sleep-valley/core/interfaces';

export class VoteCommand {
  constructor(
    public readonly voteCreate: VoteCreate,
    public readonly user: User,
  ) {}
}
