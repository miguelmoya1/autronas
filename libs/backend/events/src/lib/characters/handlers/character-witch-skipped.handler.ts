import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CharacterWitchSkippedEvent } from '../impl/character-witch-skipped.event';

@EventsHandler(CharacterWitchSkippedEvent)
export class CharacterWitchSkippedHandler implements IEventHandler<CharacterWitchSkippedEvent> {
  private readonly logger = new Logger(CharacterWitchSkippedHandler.name);

  async handle(event: CharacterWitchSkippedEvent) {
    this.logger.debug('Handler...');

    this.logger.debug(JSON.stringify(event, undefined, 2));

    // const { gameID } = event;

    // this.gameGateway.sendToRoom(gameID, {
    //   characters: true,
    //   character: true,
    // });

    // DO NET SEND TO ROOM, BECAUSE THE GAME WILL CHANGE PHASE AND NOTIFY EVERYONE
  }
}
