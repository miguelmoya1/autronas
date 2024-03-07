import { CommandsModule } from '@autronas/backend/commands';
import { DatabaseModule } from '@autronas/backend/database';
import { EventsModule } from '@autronas/backend/events';
import { GatewaysModule } from '@autronas/backend/gateways';
import { QueriesModule } from '@autronas/backend/queries';
import { SagasModule } from '@autronas/backend/sagas';
import { ServicesModule } from '@autronas/backend/services';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { TranslateModule } from './translate/translate.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CqrsModule.forRoot(),
    ServicesModule,
    CommandsModule,
    QueriesModule,
    SagasModule,
    DatabaseModule,
    EventsModule,
    GatewaysModule,

    AuthModule,
    ClientsModule,
    UsersModule,
    TranslateModule,
  ],
})
export class AppModule {}
