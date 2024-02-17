import { signal } from '@angular/core';
import { defaultDataLoading } from '@sleep-valley/app/shared';

export class GamesService {
  public readonly all = signal(defaultDataLoading());

  public loadAll = jest.fn();
}
