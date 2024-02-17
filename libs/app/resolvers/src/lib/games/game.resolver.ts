import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { STORE_KEYS, StoreService } from '@sleep-valley/app/store';

export const prepareGameResolver: ResolveFn<void> = (route) => {
  const gameID = route.paramMap.get('gameID');

  if (!gameID) {
    return;
  }

  const store = inject(StoreService);

  store.set(STORE_KEYS.GAME_ID, gameID);
};
