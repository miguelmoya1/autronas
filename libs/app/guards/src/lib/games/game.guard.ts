import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { STORE_KEYS, StoreService } from '@sleep-valley/app/store';

export const gameGuardDeactivate: CanDeactivateFn<boolean> = () => {
  const store = inject(StoreService);

  store.set(STORE_KEYS.GAME_ID, undefined);

  return true;
};
