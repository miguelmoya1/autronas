import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { GameGateway } from '@sleep-valley/backend/gateways';
import { GameFinishedEvent } from '../impl/game-finished.event';

@EventsHandler(GameFinishedEvent)
export class GameFinishedHandler implements IEventHandler<GameFinishedEvent> {
  private readonly logger = new Logger(GameFinishedHandler.name);

  constructor(private readonly gameGateway: GameGateway) {}

  async handle(event: GameFinishedEvent) {
    this.logger.debug('Handler...');

    const { gameID } = event;

    await this.gameGateway.sendToRoom(gameID, {
      game: true,
      characters: true,
      games: true,
    });
  }
}
