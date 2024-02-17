import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GameService } from '@sleep-valley/backend/services';
import { GameGetAllQuery } from '../impl/game-get-all.query';

@QueryHandler(GameGetAllQuery)
export class GameGetAllHandler implements IQueryHandler<GameGetAllQuery> {
  private readonly logger = new Logger(GameGetAllHandler.name);

  constructor(private readonly gameService: GameService) {}

  async execute(query: GameGetAllQuery) {
    this.logger.debug('Handler...');

    const { user } = query;

    return this.gameService.getAll(user);
  }
}
