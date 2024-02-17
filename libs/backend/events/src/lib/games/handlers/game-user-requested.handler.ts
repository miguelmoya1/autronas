import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { GameGateway } from '@sleep-valley/backend/gateways';
import { GameUserRequestedEvent } from '../impl/game-user-requested.event';

@EventsHandler(GameUserRequestedEvent)
export class GameUserRequestedHandler implements IEventHandler<GameUserRequestedEvent> {
  private readonly logger = new Logger(GameUserRequestedHandler.name);

  constructor(private readonly gameGateway: GameGateway) {}

  async handle(event: GameUserRequestedEvent) {
    this.logger.debug('Handler...');

    const { gameID } = event;

    this.gameGateway.sendToRoom(gameID, {
      game: true,
      users: true,
    });
  }
}
