import { CharacterKillByWitch, User } from '@sleep-valley/core/interfaces';

export class CharacterKillByWitchCommand {
  constructor(
    public readonly characterKillByWitch: CharacterKillByWitch,
    public readonly user: User,
  ) {}
}
