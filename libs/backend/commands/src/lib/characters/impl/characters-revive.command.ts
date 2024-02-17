import { CharacterRevive, User } from '@sleep-valley/core/interfaces';

export class CharacterReviveCommand {
  constructor(
    public readonly characterRevive: CharacterRevive,
    public readonly user: User,
  ) {}
}
