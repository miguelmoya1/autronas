import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { GameGateway } from '@sleep-valley/backend/gateways';
import { GameStartedEvent } from '../impl/game-started.event';

@EventsHandler(GameStartedEvent)
export class GameStartedHandler implements IEventHandler<GameStartedEvent> {
  private readonly logger = new Logger(GameStartedHandler.name);

  constructor(private readonly gameGateway: GameGateway) {}

  async handle(event: GameStartedEvent) {
    this.logger.debug('Handler...');

    const { gameID } = event;

    await this.gameGateway.sendToRoom(gameID, {
      game: true,
      characters: true,
    });
  }
}
