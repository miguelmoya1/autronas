import { signal } from '@angular/core';
import { defaultDataLoading } from '@sleep-valley/app/shared';

export class CharactersGameService {
  public readonly all = signal(defaultDataLoading());
}
