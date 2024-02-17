import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { GameGateway } from '@sleep-valley/backend/gateways';
import { GameCodeCreatedEvent } from '../impl/game-code-created.event';

@EventsHandler(GameCodeCreatedEvent)
export class GameCodeCreatedHandler implements IEventHandler<GameCodeCreatedEvent> {
  private readonly logger = new Logger(GameCodeCreatedHandler.name);

  constructor(private readonly gameGateway: GameGateway) {}

  async handle(event: GameCodeCreatedEvent) {
    this.logger.debug('Handler...');

    const { gameID } = event;

    this.gameGateway.sendToRoom(gameID, {
      game: true,
      games: true,
    });
  }
}
