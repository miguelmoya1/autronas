import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { GameGateway } from '@sleep-valley/backend/gateways';
import { VoteClearedEvent } from '../impl/vote-cleared.event';

@EventsHandler(VoteClearedEvent)
export class VoteClearedHandler implements IEventHandler<VoteClearedEvent> {
  private readonly logger = new Logger(VoteClearedHandler.name);

  constructor(private readonly gameGateway: GameGateway) {}

  async handle(event: VoteClearedEvent) {
    this.logger.debug('Handler...');

    const { gameID } = event;

    this.gameGateway.sendToRoom(gameID, {
      characters: true,
      vote: true,
    });
  }
}
