import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AuthService } from '@sleep-valley/backend/services';
import { AuthRehydrateQuery } from '../impl/auth-rehydrate.query';

@QueryHandler(AuthRehydrateQuery)
export class AuthRehydrateHandler implements IQueryHandler<AuthRehydrateQuery> {
  private readonly logger = new Logger(AuthRehydrateHandler.name);

  constructor(private readonly authService: AuthService) {}

  async execute(command: AuthRehydrateQuery) {
    this.logger.debug('Handler...');
    const { user } = command;

    const token = await this.authService.rehydrate(user);

    user.rehydrate();
    user.commit();

    return { token };
  }
}
