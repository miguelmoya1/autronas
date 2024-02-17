import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CharacterService, GameService } from '@sleep-valley/backend/services';
import { CharacterType } from '@sleep-valley/core/enums';
import { CharacterKillByWitchCommand } from '../impl/characters-kill-by-witch.command';

@CommandHandler(CharacterKillByWitchCommand)
export class CharacterKillByWitchHandler implements ICommandHandler<CharacterKillByWitchCommand> {
  private readonly logger = new Logger(CharacterKillByWitchHandler.name);

  constructor(
    private readonly characterService: CharacterService,
    private readonly gameService: GameService,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: CharacterKillByWitchCommand) {
    this.logger.debug('Handler...');
    const {
      characterKillByWitch: { gameID, characterID },
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

    if (!character.permissions.canKillAsWitch) {
      this.logger.error('CHARACTER_CANNOT_KILL');
      throw new HttpException('CHARACTER_CANNOT_KILL', HttpStatus.BAD_REQUEST);
    }

    const characterToKill = await this.characterService.get(characterID, user);

    if (!characterToKill) {
      this.logger.error('CHARACTER_NOT_FOUND');
      throw new HttpException('CHARACTER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    if (!characterToKill.isAlive) {
      this.logger.error('CHARACTER_NOT_DEAD');
      throw new HttpException('CHARACTER_NOT_DEAD', HttpStatus.BAD_REQUEST);
    }

    if (characterToKill.id === character.id) {
      this.logger.error('CANNOT_KILL_SELF');
      throw new HttpException('CANNOT_KILL_SELF', HttpStatus.BAD_REQUEST);
    }

    const characterToKillEvent = this.eventPublisher.mergeObjectContext(characterToKill);

    characterToKillEvent.kill(CharacterType.WITCH);

    await this.characterService.save(characterToKillEvent);

    characterToKillEvent.commit();
  }
}
