import { signal } from '@angular/core';
import { defaultDataLoading } from '@sleep-valley/app/shared';

export class GameRequestsService {
  public readonly all = signal(defaultDataLoading());
}
