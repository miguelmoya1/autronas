import { ClientsService } from '@autronas/backend/services';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ClientUpdateCommand } from '../impl/client-update.command';

@CommandHandler(ClientUpdateCommand)
export class ClientUpdateHandler implements ICommandHandler<ClientUpdateCommand> {
  private readonly logger = new Logger(ClientUpdateHandler.name);

  constructor(
    private readonly clientsService: ClientsService,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: ClientUpdateCommand) {
    this.logger.debug('Handler...');

    const { user, client, clientID } = command;

    const clientDB = await this.clientsService.update(client, clientID, user);

    if (!clientDB) {
      throw new HttpException('ERROR_UPDATING_CLIENT', HttpStatus.BAD_REQUEST);
    }

    const clientEntity = this.eventPublisher.mergeObjectContext(clientDB);

    clientEntity.update(client);

    clientEntity.commit();
  }
}
