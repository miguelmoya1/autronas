import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { GameGateway } from '@sleep-valley/backend/gateways';
import { VoteConfirmedEvent } from '../impl/vote-confirmed.event';

@EventsHandler(VoteConfirmedEvent)
export class VoteConfirmedHandler implements IEventHandler<VoteConfirmedEvent> {
  private readonly logger = new Logger(VoteConfirmedHandler.name);

  constructor(private readonly gameGateway: GameGateway) {}

  async handle(event: VoteConfirmedEvent) {
    this.logger.debug('Handler...');

    const { gameID } = event;

    this.gameGateway.sendToRoom(gameID, {
      game: true,
      characters: true,
      vote: true,
    });
  }
}
