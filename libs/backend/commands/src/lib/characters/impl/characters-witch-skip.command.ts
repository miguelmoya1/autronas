import { CharacterWitchSkip, User } from '@sleep-valley/core/interfaces';

export class CharacterWitchSkipCommand {
  constructor(
    public readonly characterWitchSkip: CharacterWitchSkip,
    public readonly user: User,
  ) {}
}
