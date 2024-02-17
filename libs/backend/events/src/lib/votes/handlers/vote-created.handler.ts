import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { GameGateway } from '@sleep-valley/backend/gateways';
import { VoteCreatedEvent } from '../impl/vote-created.event';

@EventsHandler(VoteCreatedEvent)
export class VoteCreatedHandler implements IEventHandler<VoteCreatedEvent> {
  private readonly logger = new Logger(VoteCreatedHandler.name);

  constructor(private readonly gameGateway: GameGateway) {}

  async handle(event: VoteCreatedEvent) {
    this.logger.debug('Handler...');

    const { gameID } = event;

    this.gameGateway.sendToRoom(gameID, {
      game: true,
      characters: true,
      vote: true,
    });
  }
}
