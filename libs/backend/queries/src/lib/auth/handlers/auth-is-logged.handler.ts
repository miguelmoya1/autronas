import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AuthIsLoggedQuery } from '../impl/auth-is-logged.query';

@QueryHandler(AuthIsLoggedQuery)
export class AuthIsLoggedHandler implements IQueryHandler<AuthIsLoggedQuery> {
  private readonly logger = new Logger(AuthIsLoggedHandler.name);

  async execute(command: AuthIsLoggedQuery) {
    this.logger.debug('Handler...');

    const { user } = command;

    if (!user || !user.email || !user.id) {
      return false;
    }

    return true;
  }
}
