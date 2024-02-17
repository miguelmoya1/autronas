import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { GameGateway } from '@sleep-valley/backend/gateways';
import { GameDeclinedEvent } from '../impl';

@EventsHandler(GameDeclinedEvent)
export class GameDeclinedHandler implements IEventHandler<GameDeclinedEvent> {
  private readonly logger = new Logger(GameDeclinedHandler.name);

  constructor(private readonly gameGateway: GameGateway) {}

  async handle(event: GameDeclinedEvent) {
    this.logger.debug('Handler...');

    const { gameID } = event;

    await this.gameGateway.sendToRoom(gameID, {
      game: true,
      users: true,
    });
  }
}
