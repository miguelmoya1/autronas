import {
  HttpEventType,
  HttpInterceptorFn,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthDtoService } from '@autronas/frontend/actions';
import { tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    tap((res) => {
      if (res.type === HttpEventType.Response) {
        if (res.status === HttpStatusCode.Unauthorized) {
          inject(AuthDtoService).logout();
        }
      }
    }),
  );
};
