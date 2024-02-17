import { ArgumentsHost, Catch } from '@nestjs/common';
import { AbstractHttpAdapter, BaseExceptionFilter } from '@nestjs/core';
import * as Sentry from '@sentry/node';

@Catch()
export class SentryFilter extends BaseExceptionFilter {
  override handleUnknownError(
    exception: unknown,
    host: ArgumentsHost,
    applicationRef: AbstractHttpAdapter<unknown, unknown, unknown>,
  ): void {
    Sentry.captureException(exception);
    super.handleUnknownError(exception, host, applicationRef);
  }
}
