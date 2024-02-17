import { User } from '@sleep-valley/core/interfaces';

export class GameGetAllQuery {
  constructor(public readonly user: User) {}
}
