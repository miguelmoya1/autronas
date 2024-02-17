import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { VotesService } from '@sleep-valley/backend/services';
import { VoteGetMyQuery } from '../impl/vote-get-my.query';

@QueryHandler(VoteGetMyQuery)
export class VoteGetMyHandler implements IQueryHandler<VoteGetMyQuery> {
  private readonly logger = new Logger(VoteGetMyHandler.name);

  constructor(private readonly votesService: VotesService) {}

  async execute(query: VoteGetMyQuery) {
    this.logger.debug('Handler...');

    const { user, gameID } = query;

    return this.votesService.getMy(user.id, gameID);
  }
}
