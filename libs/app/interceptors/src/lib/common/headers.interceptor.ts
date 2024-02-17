import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
import { from, switchMap } from 'rxjs';

export const headersInterceptor = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
  return from(Preferences.get({ key: process.env['SV_TOKEN_NAME'] as string })).pipe(
    switchMap(({ value }) => {
      let headersToAdd = request.headers;

      if (value) {
        headersToAdd = headersToAdd.set('Authorization', `Bearer ${value}`);
      }

      if (request.headers.get('skip-interceptor')) {
        return next(request);
      }

      const authReq = request.clone({
        url: process.env['SV_SERVER_URL'] + request.url,
        headers: headersToAdd,
      });

      return next(authReq);
    }),
  );
};
