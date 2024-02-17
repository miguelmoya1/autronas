import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CharacterService, GameService } from '@sleep-valley/backend/services';
import { CharacterType } from '@sleep-valley/core/enums';
import { CharacterWitchSkipCommand } from '../impl/characters-witch-skip.command';

@CommandHandler(CharacterWitchSkipCommand)
export class CharacterWitchSkipHandler implements ICommandHandler<CharacterWitchSkipCommand> {
  private readonly logger = new Logger(CharacterWitchSkipHandler.name);

  constructor(
    private readonly characterService: CharacterService,
    private readonly gameService: GameService,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: CharacterWitchSkipCommand) {
    this.logger.debug('Handler...');
    const {
      characterWitchSkip: { gameID },
      user,
    } = command;

    const game = await this.gameService.get(gameID, user);

    if (!game) {
      this.logger.error('GAME_NOT_FOUND');
      throw new HttpException('GAME_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const character = await this.characterService.getMyInGame(gameID, user);

    if (!character) {
      this.logger.error('CHARACTER_NOT_FOUND');
      throw new HttpException('CHARACTER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    if (character.type !== CharacterType.WITCH) {
      this.logger.error('CHARACTER_NOT_WITCH');
      throw new HttpException('CHARACTER_NOT_WITCH', HttpStatus.BAD_REQUEST);
    }

    const characterEvent = this.eventPublisher.mergeObjectContext(character);

    characterEvent.skip();

    characterEvent.commit();
  }
}
