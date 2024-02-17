import { signal } from '@angular/core';
import { defaultDataLoading } from '@sleep-valley/app/shared';

export class VoteService {
  public readonly current = signal(defaultDataLoading());
}
