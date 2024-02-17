import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserLoggedInEvent } from '../impl/user-logged-in.event';

@EventsHandler(UserLoggedInEvent)
export class UserLoggedInHandler implements IEventHandler<UserLoggedInEvent> {
  private readonly logger = new Logger(UserLoggedInHandler.name);

  async handle() {
    this.logger.debug('Handler...');
  }
}
