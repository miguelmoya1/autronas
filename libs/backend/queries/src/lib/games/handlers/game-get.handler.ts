import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GameService } from '@sleep-valley/backend/services';
import { GameGetQuery } from '../impl/game-get.query';

@QueryHandler(GameGetQuery)
export class GameGetHandler implements IQueryHandler<GameGetQuery> {
  private readonly logger = new Logger(GameGetHandler.name);

  constructor(private readonly gameService: GameService) {}

  async execute(query: GameGetQuery) {
    this.logger.debug('Handler...');

    const { user, gameID } = query;

    return this.gameService.get(gameID, user);
  }
}
