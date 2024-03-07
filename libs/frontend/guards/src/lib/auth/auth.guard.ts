import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@autronas/frontend/services';
import { STORE_KEYS, StoreService } from '@autronas/frontend/store';
import { filter, interval, map } from 'rxjs';

export const authGuard =
  (mustBeLogged = true) =>
  () => {
    inject(AuthService);

    const store = inject(StoreService);

    const isLogged = store.get(STORE_KEYS.IS_LOGGED);
    const isLoggedLoading = store.get(STORE_KEYS.IS_LOGGED_LOADING);
    const router = inject(Router);

    return interval(10).pipe(
      filter(() => !isLoggedLoading()),
      map(() => {
        if (mustBeLogged && !isLogged()) {
          router.navigate(['/auth/login']);
          return false;
        } else if (!mustBeLogged && isLogged()) {
          router.navigate(['/dashboard']);
          return false;
        }

        return true;
      }),
    );
  };
