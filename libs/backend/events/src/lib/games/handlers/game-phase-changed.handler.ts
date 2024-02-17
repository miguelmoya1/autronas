import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { GameGateway } from '@sleep-valley/backend/gateways';
import { GamePhaseChangedEvent } from '../impl/game-phase-changed.event';

@EventsHandler(GamePhaseChangedEvent)
export class GamePhaseChangedHandler implements IEventHandler<GamePhaseChangedEvent> {
  private readonly logger = new Logger(GamePhaseChangedHandler.name);

  constructor(private readonly gameGateway: GameGateway) {}

  async handle(event: GamePhaseChangedEvent) {
    this.logger.debug('Handler...');

    const { gameID } = event;

    await this.gameGateway.sendToRoom(gameID, {
      game: true,
      games: true,
      characters: true,
    });
  }
}
