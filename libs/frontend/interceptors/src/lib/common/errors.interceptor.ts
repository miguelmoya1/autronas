import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { STORE_KEYS, StoreService } from '@autronas/frontend/store';
import { catchError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);
  const store = inject(StoreService);

  return next(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse) {
        const errorDB = error.error;

        if (errorDB && errorDB.message) {
          const message = errorDB.message;

          if (typeof message === 'string') {
            snackBar.open(
              store.get(STORE_KEYS.TRANSLATE)().data?.[message] || message,
              store.get(STORE_KEYS.TRANSLATE)().data?.['CLOSE'] || 'CLOSE',
              {
                duration: 5000,
              },
            );
          } else if (Array.isArray(message)) {
            // only show the first error
            snackBar.open(
              store.get(STORE_KEYS.TRANSLATE)().data?.[message[0]] || message[0],
              store.get(STORE_KEYS.TRANSLATE)().data?.['CLOSE'] || 'CLOSE',
              {
                duration: 5000,
              },
            );
          }
        }
      }

      throw error;
    }),
  );
};
