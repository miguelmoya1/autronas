import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ClientsService } from '@autronas/frontend/services';
import { STORE_KEYS, StoreService } from '@autronas/frontend/store';

export const clientsResolver: ResolveFn<boolean> = () => {
  inject(ClientsService);

  return true;
};

export const clientResolver: ResolveFn<boolean> = (route) => {
  const clientID = route.params['clientID'];
  const store = inject(StoreService);

  if (clientID && store) {
    store.set(STORE_KEYS.CLIENT_ID, clientID);

    return true;
  }

  return false;
};
