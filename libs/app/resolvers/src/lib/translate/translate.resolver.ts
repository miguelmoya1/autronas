import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { STORE_KEYS, StoreService } from '@autronas/app/store';
import { filter, interval } from 'rxjs';

export const translateResolver: ResolveFn<number> = () => {
  const translate = inject(StoreService).get(STORE_KEYS.TRANSLATE);

  return interval(100).pipe(filter(() => !translate().loading));
};
