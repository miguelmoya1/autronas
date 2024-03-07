import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  APP_INITIALIZER,
  ApplicationConfig,
  ErrorHandler,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  Router,
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
} from '@angular/router';
import { server_url, token_name } from '@autronas/frontend/helpers';
import {
  authInterceptor,
  headersInterceptor,
  loggerInterceptor,
} from '@autronas/frontend/interceptors';
import { MatPaginatorIntlService } from '@autronas/frontend/services';
import { Preferences } from '@capacitor/preferences';
import * as Sentry from '@sentry/angular-ivy';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { appRoutes } from './app.routes';

const socketConfig: SocketIoConfig = {
  url: server_url,
  options: {
    transports: ['websocket'],
    path: '/socket.io',
    auth: async (cb) => {
      const token = await Preferences.get({ key: token_name });
      return cb({ token });
    },
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      withComponentInputBinding(),
      withInMemoryScrolling(),
    ),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([
        loggerInterceptor,
        headersInterceptor,
        authInterceptor,
      ]),
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom(SocketIoModule.forRoot(socketConfig)),
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: true,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginatorIntlService,
    },
  ],
};
