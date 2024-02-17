import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { GameGateway } from '@sleep-valley/backend/gateways';
import { CharacterSeenEvent } from '../impl/character-seen.event';

@EventsHandler(CharacterSeenEvent)
export class CharacterSeenHandler implements IEventHandler<CharacterSeenEvent> {
  private readonly logger = new Logger(CharacterSeenHandler.name);

  constructor(private readonly gameGateway: GameGateway) {}

  async handle(event: CharacterSeenEvent) {
    this.logger.debug('Handler...');

    const { gameID } = event;

    this.gameGateway.sendToRoom(gameID, {
      characters: true,
    });
  }
}
