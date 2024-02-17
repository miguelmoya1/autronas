import { UsersService } from '@autronas/backend/services';
import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserGetLoggedQuery } from '../impl/user-get-logged.query';

@QueryHandler(UserGetLoggedQuery)
export class UserGetLoggedHandler implements IQueryHandler<UserGetLoggedQuery> {
  private readonly logger = new Logger(UserGetLoggedHandler.name);

  constructor(private readonly usersService: UsersService) {}

  async execute(query: UserGetLoggedQuery) {
    this.logger.debug('Handler...');

    const { user } = query;

    return this.usersService.getLogged(user.id);
  }
}
