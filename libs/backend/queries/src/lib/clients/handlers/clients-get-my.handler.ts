import { ClientsService } from '@autronas/backend/services';
import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ClientsGetMyQuery } from '../impl/clients-get-my.query';

@QueryHandler(ClientsGetMyQuery)
export class ClientsGetMyHandler implements IQueryHandler<ClientsGetMyQuery> {
  private readonly logger = new Logger(ClientsGetMyHandler.name);

  constructor(private readonly clientsService: ClientsService) {}

  async execute(query: ClientsGetMyQuery) {
    this.logger.debug('Handler...');

    const { paginator, user } = query;

    return this.clientsService.getMy(paginator, user);
  }
}
