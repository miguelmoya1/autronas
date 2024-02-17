import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CharacterEntity } from '@sleep-valley/backend/entities';
import { CharacterService, GameService } from '@sleep-valley/backend/services';
import { CharacterType } from '@sleep-valley/core/enums';
import { CharacterCreateForGameCommand } from '../impl/characters-create-for-game.command';

@CommandHandler(CharacterCreateForGameCommand)
export class CharacterCreateForGameHandler implements ICommandHandler<CharacterCreateForGameCommand> {
  private readonly logger = new Logger(CharacterCreateForGameHandler.name);

  constructor(
    private readonly characterService: CharacterService,
    private readonly gameService: GameService,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: CharacterCreateForGameCommand) {
    this.logger.debug('Handler...');
    const { gameID } = command;

    const gameDB = await this.gameService.get(gameID, {});

    if (!gameDB) {
      return;
    }

    const game = this.eventPublisher.mergeObjectContext(gameDB);

    const totalUsers = game.Users.length;

    const availableCharacterTypes = await this.characterService.getAvailableCharacterTypesShuffled(totalUsers, game);

    const characters: CharacterEntity[] = [];

    for (const user of game.Users) {
      const characterType = availableCharacterTypes.pop();
      const character = new CharacterEntity(
        { ownerID: user.id, gameID: game.id, type: characterType, seenBySeer: characterType === CharacterType.SEER },
        user,
      );

      characters.push(character);
    }

    if (process.env['NODE_ENV'] === 'development') {
      const characterToChange = characters.find(
        (character) =>
          character.ownerID === '791d4e16-fd2b-4411-a5c5-5928cd04b4dd' && character.type !== CharacterType.SEER,
      );

      if (characterToChange) {
        const oldType = characterToChange?.type;
        characterToChange.type = CharacterType.SEER;

        const characterToChangeToVillager = characters.find(
          (character) =>
            character.ownerID !== '791d4e16-fd2b-4411-a5c5-5928cd04b4dd' && character.type === CharacterType.SEER,
        );

        if (characterToChangeToVillager) {
          characterToChangeToVillager.type = oldType;
        }
      }
    }

    game.charactersCreated(characters);

    await this.characterService.bulkCreate(characters);

    game.commit();
  }
}
