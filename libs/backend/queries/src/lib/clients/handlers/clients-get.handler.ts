import { ClientsService } from '@autronas/backend/services';
import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ClientsGetQuery } from '../impl/clients-get.query';

@QueryHandler(ClientsGetQuery)
export class ClientsGetHandler implements IQueryHandler<ClientsGetQuery> {
  private readonly logger = new Logger(ClientsGetHandler.name);

  constructor(private readonly clientsService: ClientsService) {}

  async execute(query: ClientsGetQuery) {
    this.logger.debug('Handler...');

    const { clientID, user } = query;

    return this.clientsService.get(clientID, user);
  }
}
