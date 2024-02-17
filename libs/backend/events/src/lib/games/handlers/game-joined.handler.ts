import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { GameGateway } from '@sleep-valley/backend/gateways';
import { GameJoinedEvent } from '../impl/game-joined.event';

@EventsHandler(GameJoinedEvent)
export class GameJoinedHandler implements IEventHandler<GameJoinedEvent> {
  private readonly logger = new Logger(GameJoinedHandler.name);

  constructor(private readonly gameGateway: GameGateway) {}

  async handle(event: GameJoinedEvent) {
    this.logger.debug('Handler...');

    const { gameID } = event;

    await this.gameGateway.sendToRoom(gameID, {
      game: true,
      users: true,
    });
  }
}
