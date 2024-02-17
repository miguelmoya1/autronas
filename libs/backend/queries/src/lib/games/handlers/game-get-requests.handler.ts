import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GameService } from '@sleep-valley/backend/services';
import { GameGetRequestsQuery } from '../impl/game-get-requests.query';

@QueryHandler(GameGetRequestsQuery)
export class GameGetRequestsHandler implements IQueryHandler<GameGetRequestsQuery> {
  private readonly logger = new Logger(GameGetRequestsHandler.name);

  constructor(private readonly gameService: GameService) {}

  async execute(query: GameGetRequestsQuery) {
    this.logger.debug('Handler...');

    const { gameID, user } = query;

    const game = await this.gameService.get(gameID, user);

    if (!game) {
      return [];
    }

    return this.gameService.getRequests(gameID);
  }
}
