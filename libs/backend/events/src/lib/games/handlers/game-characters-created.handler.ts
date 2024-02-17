import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { GameGateway } from '@sleep-valley/backend/gateways';
import { GameCharactersCreatedEvent } from '../impl/game-characters-created.event';

@EventsHandler(GameCharactersCreatedEvent)
export class GameCharactersCreatedHandler implements IEventHandler<GameCharactersCreatedEvent> {
  private readonly logger = new Logger(GameCharactersCreatedHandler.name);

  constructor(private readonly gameGateway: GameGateway) {}

  async handle(event: GameCharactersCreatedEvent) {
    this.logger.debug('Handler...');

    const { gameID } = event;

    this.gameGateway.sendToRoom(gameID, {
      characters: true,
      game: true,
    });
  }
}
