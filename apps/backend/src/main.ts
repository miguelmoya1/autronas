import { ClassSerializerInterceptor, LogLevel, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import * as Sentry from '@sentry/node';
import { AppModule } from './app/app.module';

// function setupSentry(app: NestFastifyApplication) {
//   const configService = app.get(ConfigService);

//   Sentry.init({
//     dsn: configService.get('SENTRY_DSN'),
//     // eslint-disable-next-line
//     integrations: [new ProfilingIntegration() as any],
//     // Performance Monitoring
//     tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
//     // Set sampling rate for profiling - this is relative to tracesSampleRate
//     profilesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
//   });

//   const { httpAdapter } = app.get(HttpAdapterHost);

//   app.useGlobalFilters(new SentryFilter(httpAdapter));
// }

function setupSwagger(app: NestFastifyApplication) {
  const config = new DocumentBuilder()
    .setTitle('Autronas API')
    .setDescription('All the documentation for the Autronas API endpoints')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'Autronas API',
    customfavIcon: '/favicon.ico',
    customCss: '.swagger-ui .topbar { display: none }',
  });
}

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

    app.enableCors();

    // setupSentry(app);

    setupSwagger(app);

    const configService = app.get(ConfigService);

    await app.listen(configService.get('PORT') || 3000);

    // use logs errors only if the application is on production, otherwise use the default logger
    const logLevels: LogLevel[] =
      configService.get('NODE_ENV') === 'development'
        ? ['debug', 'error', 'warn', 'log', 'verbose', 'fatal']
        : ['error'];

    app.useLogger(logLevels);

    const logger = new Logger('bootstrap');

    logger.log(`Application listening on port ${configService.get('PORT') || 3000}`);
  } catch (error) {
    console.error(error);
  }
}

bootstrap();
