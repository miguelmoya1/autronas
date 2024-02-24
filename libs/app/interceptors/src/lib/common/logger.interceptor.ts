import {
  HttpHandlerFn,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { server_url } from '@autronas/app/helpers';
import { catchError, tap } from 'rxjs';

const transform = (bytes: number) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) {
    return '0 Bytes';
  }

  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`;
};

const log = ({
  type,
  name,
  variables,
  data,
  length,
  params,
}: {
  type: string;
  name: string;
  variables: unknown;
  data: unknown;
  length: string | null;
  params: HttpParams;
}) => {
  console.groupCollapsed(
    `[ %c${type}`,
    'color: green; font-weight: bold; font-size: .95rem;',
    `]: ${name.replace(server_url, '')} (${transform(+(length || 0))})`,
  );

  if (params && params.keys().length) {
    console.log(
      '%cPARAMS',
      'color: orange; font-weight: bold; font-size: .95rem;',
      params.toString() || '',
    );
  }

  if (variables && Object.keys(variables).length) {
    console.log(
      '%cREQUEST',
      'color: yellow; font-weight: bold; font-size: .95rem;',
      variables || '',
    );
  }

  console.log(
    '%cRESPONSE',
    'color: dodgerblue; font-weight: bold; font-size: .95rem;',
    data || '',
  );
  console.groupEnd();
};

export const loggerInterceptor = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  if (!isDevMode()) {
    return next(request);
  }

  return next(request).pipe(
    tap(async (result) => {
      if (result instanceof HttpResponse) {
        log({
          type: request.method,
          name: request.url,
          variables: request.body,
          data: result.body,
          length: result.headers.get('content-length'),
          params: request.params,
        });
      }
    }),
    catchError((error) => {
      log({
        type: request.method,
        name: request.url,
        variables: request.body,
        data: error.error,
        length: null,
        params: request.params,
      });

      throw error;
    }),
  );
};
