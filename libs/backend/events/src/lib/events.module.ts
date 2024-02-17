import { Global, Module } from '@nestjs/common';
import { UserEventHandlers } from './users/handlers';

const providers = [UserEventHandlers ?? []].flat();

@Global()
@Module({
  providers: [...providers],
})
export class EventsModule {}
