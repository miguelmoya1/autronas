import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { GameCreatedEvent } from '../impl/game-created.event';

@EventsHandler(GameCreatedEvent)
export class GameCreatedHandler implements IEventHandler<GameCreatedEvent> {
  private readonly logger = new Logger(GameCreatedHandler.name);

  async handle(event: GameCreatedEvent) {
    this.logger.debug('Handler...');

    const { gameID } = event;

    this.logger.debug(gameID);
  }
}
