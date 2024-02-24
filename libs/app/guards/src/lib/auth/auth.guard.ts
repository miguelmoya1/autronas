import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanDeactivateFn, Router } from '@angular/router';
import { STORE_KEYS, StoreService } from '@autronas/app/store';
import { map, takeWhile, tap } from 'rxjs';

export const authGuardLogged: CanDeactivateFn<boolean> = () => {
  const router = inject(Router);

  return authGuard().pipe(
    tap((logged) => {
      if (!logged) {
        router.navigate(['/auth/login']);
      }
    }),
  );
};

export const authGuardNotLogged = () => {
  const router = inject(Router);

  return authGuard().pipe(
    tap((logged) => {
      if (logged) {
        router.navigate(['/']);
      }
    }),
    map((logged) => !logged),
  );
};

const authGuard = () => {
  const token = inject(StoreService).get(STORE_KEYS.TOKEN);
  const isLogged = inject(StoreService).get(STORE_KEYS.IS_LOGGED);

  return toObservable(token).pipe(
    takeWhile((token) => token.loading, true),
    map(() => isLogged()),
  );
};
