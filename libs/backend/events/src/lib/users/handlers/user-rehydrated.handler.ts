import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserRehydratedEvent } from '../impl/user-rehydrated.event';

@EventsHandler(UserRehydratedEvent)
export class UserRehydratedHandler implements IEventHandler<UserRehydratedEvent> {
  private readonly logger = new Logger(UserRehydratedHandler.name);

  async handle() {
    this.logger.debug('Handler...');
  }
}
