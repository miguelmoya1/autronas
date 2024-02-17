import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CharacterService } from '@sleep-valley/backend/services';
import { CharacterGetAllQuery } from '../impl/character-get-all.query';

@QueryHandler(CharacterGetAllQuery)
export class CharacterGetAllHandler implements IQueryHandler<CharacterGetAllQuery> {
  private readonly logger = new Logger(CharacterGetAllHandler.name);

  constructor(private readonly characterService: CharacterService) {}

  async execute(query: CharacterGetAllQuery) {
    this.logger.debug('Handler...');

    const { gameID, user } = query;

    return this.characterService.getAllInGame(gameID, user);
  }
}
