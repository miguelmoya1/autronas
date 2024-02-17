import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UsersService } from '@sleep-valley/backend/services';
import { UserGetInGameQuery } from '../impl/user-get-in-game.query';

@QueryHandler(UserGetInGameQuery)
export class UserGetInGameHandler implements IQueryHandler<UserGetInGameQuery> {
  private readonly logger = new Logger(UserGetInGameHandler.name);

  constructor(private readonly usersService: UsersService) {}

  async execute(query: UserGetInGameQuery) {
    this.logger.debug('Handler...');

    const { user, gameID } = query;

    return this.usersService.getInGame(user.id, gameID);
  }
}
