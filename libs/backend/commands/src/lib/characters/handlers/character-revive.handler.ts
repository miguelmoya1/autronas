import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CharacterService, GameService } from '@sleep-valley/backend/services';
import { CharacterReviveCommand } from '../impl/characters-revive.command';

@CommandHandler(CharacterReviveCommand)
export class CharacterReviveHandler implements ICommandHandler<CharacterReviveCommand> {
  private readonly logger = new Logger(CharacterReviveHandler.name);
  constructor(
    private readonly characterService: CharacterService,
    private readonly gameService: GameService,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: CharacterReviveCommand) {
    this.logger.debug('Handler...');
    const {
      characterRevive: { characterID, gameID },
      user,
    } = command;

    const game = await this.gameService.get(gameID, user);

    if (!game) {
      this.logger.error('GAME_NOT_FOUND');
      throw new HttpException('GAME_NOT_FOUND', HttpStatus.BAD_REQUEST);
    }

    const characterToRevive = await this.characterService.get(characterID, user);
    const characterOwner = await this.characterService.getMyInGame(gameID, user);

    if (!characterOwner) {
      this.logger.error('CHARACTER_NOT_FOUND');
      throw new HttpException('CHARACTER_NOT_FOUND', HttpStatus.BAD_REQUEST);
    }

    if (!characterToRevive) {
      this.logger.error('CHARACTER_NOT_FOUND');
      throw new HttpException('CHARACTER_NOT_FOUND', HttpStatus.BAD_REQUEST);
    }

    if (!characterOwner.permissions.canReviveAsWitch) {
      this.logger.error('CHARACTER_CANNOT_REVIVE');
      throw new HttpException('CHARACTER_CANNOT_REVIVE', HttpStatus.BAD_REQUEST);
    }

    if (characterToRevive.isAlive) {
      this.logger.error('CHARACTER_IS_ALIVE');
      throw new HttpException('CHARACTER_IS_ALIVE', HttpStatus.BAD_REQUEST);
    }

    const character = this.eventPublisher.mergeObjectContext(characterToRevive);

    character.revive();

    await this.characterService.save(character);

    character.commit();
  }
}
