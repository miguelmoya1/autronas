import { signal } from '@angular/core';
import { defaultDataLoading } from '@sleep-valley/app/shared';

export class CharactersToVoteService {
  public readonly all = signal(defaultDataLoading());
}
