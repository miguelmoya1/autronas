import { ClientsService } from '@autronas/backend/services';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ClientCreateCommand } from '../impl/client-create.command';

@CommandHandler(ClientCreateCommand)
export class ClientCreateHandler
  implements ICommandHandler<ClientCreateCommand>
{
  private readonly logger = new Logger(ClientCreateHandler.name);

  constructor(
    private readonly clientsService: ClientsService,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: ClientCreateCommand) {
    this.logger.debug('Handler...');

    const { user, client } = command;

    const clientDB = await this.clientsService.create(client, user);

    if (!clientDB) {
      throw new HttpException('ERROR_CREATING_CLIENT', HttpStatus.BAD_REQUEST);
    }

    const clientEntity = this.eventPublisher.mergeObjectContext(clientDB);

    clientEntity.create(user);

    clientEntity.commit();
  }
}
