import { User } from '@sleep-valley/core/interfaces';

export class GameRequestJoinFromCodeCommand {
  constructor(
    public readonly code: string,
    public readonly user: User,
  ) {}
}
