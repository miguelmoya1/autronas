import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { GameGateway } from '@sleep-valley/backend/gateways';
import { CharacterKilledEvent } from '../impl/character-killed.event';

@EventsHandler(CharacterKilledEvent)
export class CharacterKilledHandler implements IEventHandler<CharacterKilledEvent> {
  private readonly logger = new Logger(CharacterKilledHandler.name);

  constructor(private readonly gameGateway: GameGateway) {}

  async handle(event: CharacterKilledEvent) {
    this.logger.debug('Handler...');

    const { gameID } = event;

    this.gameGateway.sendToRoom(gameID, {
      characters: true,
    });
  }
}
