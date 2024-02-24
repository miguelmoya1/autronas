import { signal } from '@angular/core';
import { defaultDataLoading } from '@autronas/app/shared';

export class UsersInGameService {
  public readonly all = signal(defaultDataLoading());

  public requireAnimation = false;

  public watchForGame = jest.fn();

  public unwatch = jest.fn();
}
