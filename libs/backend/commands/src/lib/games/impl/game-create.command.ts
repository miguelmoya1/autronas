import { GameCreateInput } from '@sleep-valley/backend/dto';
import { User } from '@sleep-valley/core/interfaces';

export class GameCreateCommand {
  constructor(
    public readonly gameCreate: GameCreateInput,
    public readonly user: User,
  ) {}
}
