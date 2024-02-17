import { CharacterSeer, User } from '@sleep-valley/core/interfaces';

export class CharacterSeerCommand {
  constructor(
    public readonly characterSeer: CharacterSeer,
    public readonly user: User,
  ) {}
}
