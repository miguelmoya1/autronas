import { signal } from '@angular/core';
import { defaultDataLoading } from '@autronas/app/shared';

export class StoreService {
  public get = jest.fn(() => signal(defaultDataLoading()));
  public set = jest.fn();
}
