import { HttpInterceptorFn } from '@angular/common/http';
import { server_url, token_name } from '@autronas/frontend/helpers';
import { Preferences } from '@capacitor/preferences';
import { from, switchMap } from 'rxjs';

export const headersInterceptor: HttpInterceptorFn = (request, next) => {
  return from(Preferences.get({ key: token_name })).pipe(
    switchMap(({ value }) => {
      let headersToAdd = request.headers;

      if (value) {
        headersToAdd = headersToAdd.set('Authorization', `Bearer ${value}`);
      }

      if (request.headers.get('skip-interceptor')) {
        return next(request);
      }

      const authReq = request.clone({
        url: server_url + request.url,
        headers: headersToAdd,
      });

      return next(authReq);
    }),
  );
};
