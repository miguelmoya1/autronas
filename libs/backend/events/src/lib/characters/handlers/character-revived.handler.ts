import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { GameGateway } from '@sleep-valley/backend/gateways';
import { CharacterRevivedEvent } from '../impl/character-revived.event';

@EventsHandler(CharacterRevivedEvent)
export class CharacterRevivedHandler implements IEventHandler<CharacterRevivedEvent> {
  private readonly logger = new Logger(CharacterRevivedHandler.name);

  constructor(private readonly gameGateway: GameGateway) {}

  async handle(event: CharacterRevivedEvent) {
    this.logger.debug('Handler...');

    const { gameID } = event;

    this.gameGateway.sendToRoom(gameID, {
      characters: true,
    });
  }
}
