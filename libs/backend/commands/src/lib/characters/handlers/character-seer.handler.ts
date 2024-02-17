import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CharacterService, GameService } from '@sleep-valley/backend/services';
import { CharacterSeerCommand } from '../impl/characters-seer.command';

@CommandHandler(CharacterSeerCommand)
export class CharacterSeerHandler implements ICommandHandler<CharacterSeerCommand> {
  private readonly logger = new Logger(CharacterSeerHandler.name);
  constructor(
    private readonly characterService: CharacterService,
    private readonly gameService: GameService,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: CharacterSeerCommand) {
    this.logger.debug('Handler...');
    const {
      characterSeer: { characterID, gameID },
      user,
    } = command;

    const game = await this.gameService.get(gameID, user);

    if (!game) {
      this.logger.error('GAME_NOT_FOUND');
      throw new HttpException('GAME_NOT_FOUND', HttpStatus.BAD_REQUEST);
    }

    const characterToSeer = await this.characterService.get(characterID, user);
    const characterOwner = await this.characterService.getMyInGame(gameID, user);

    if (!characterOwner) {
      this.logger.error('CHARACTER_NOT_FOUND');
      throw new HttpException('CHARACTER_NOT_FOUND', HttpStatus.BAD_REQUEST);
    }

    if (!characterToSeer) {
      this.logger.error('CHARACTER_NOT_FOUND');
      throw new HttpException('CHARACTER_NOT_FOUND', HttpStatus.BAD_REQUEST);
    }

    if (!characterOwner.permissions.canSeeAsSeer) {
      this.logger.error('CHARACTER_CANNOT_SEE');
      throw new HttpException('CHARACTER_CANNOT_SEE', HttpStatus.BAD_REQUEST);
    }

    if (characterToSeer.seenBySeer) {
      this.logger.error('CHARACTER_ALREADY_SEEN');
      throw new HttpException('CHARACTER_ALREADY_SEEN', HttpStatus.BAD_REQUEST);
    }

    const character = this.eventPublisher.mergeObjectContext(characterToSeer);

    character.setSeenBySeer();

    await this.characterService.save(character);

    character.commit();
  }
}
