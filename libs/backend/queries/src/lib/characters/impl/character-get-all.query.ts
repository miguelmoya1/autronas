import { User } from '@sleep-valley/core/interfaces';

export class CharacterGetAllQuery {
  constructor(
    public readonly gameID: string,
    public readonly user: User,
  ) {}
}
