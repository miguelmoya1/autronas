import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CharacterService, GameService, VotesService } from '@sleep-valley/backend/services';
import { CharacterType, GamePhase } from '@sleep-valley/core/enums';
import { CharacterKillByVotesCommand } from '../impl/characters-kill-by-votes.command';

@CommandHandler(CharacterKillByVotesCommand)
export class CharacterKillByVotesHandler implements ICommandHandler<CharacterKillByVotesCommand> {
  private readonly logger = new Logger(CharacterKillByVotesHandler.name);
  constructor(
    private readonly characterService: CharacterService,
    private readonly gameService: GameService,
    private readonly votesService: VotesService,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: CharacterKillByVotesCommand) {
    this.logger.debug('Handler...');
    const { gameID } = command;

    const game = await this.gameService.get(gameID, {});

    if (!game) {
      this.logger.error('GAME_NOT_FOUND');
      throw new HttpException('GAME_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const totalVotes = game.Votes.length;
    const characters = await this.characterService.getAllInGame(gameID, {});

    const totalVotesMustBe = characters.filter((character) => {
      if (!character.isAlive) {
        return false;
      }

      switch (game.phase) {
        case GamePhase.WEREWOLF:
          return character.type === CharacterType.WEREWOLF;
        case GamePhase.VILLAGER:
          return character.type === CharacterType.VILLAGER;
        case GamePhase.WITCH:
          return character.type === CharacterType.WITCH;
        case GamePhase.SEER:
          return character.type === CharacterType.SEER;
      }
    }).length;

    const shouldKill = totalVotes === totalVotesMustBe;

    console.log('shouldKill', shouldKill, totalVotes, totalVotesMustBe);

    if (shouldKill) {
      const votes = await this.votesService.getMultiple(game.Votes.map((vote) => vote.id));

      if (!votes || votes.length === 0) {
        return;
      }

      // if all votes are "isConfirmed: false" then do nothing
      if (votes.every((vote) => !vote.isConfirmed)) {
        this.logger.verbose('ALL_VOTES_ARE_NOT_CONFIRMED');
        return;
      }

      const characterIDs = votes.map((vote) => vote.characterID);

      const characterIDToKill = characterIDs.reduce(
        (acc, curr) => {
          if (acc[curr]) {
            acc[curr] += 1;
          } else {
            acc[curr] = 1;
          }

          return acc;
        },
        {} as Record<string, number>,
      );

      const max = Math.max(...Object.values(characterIDToKill));

      // if there are more than one character with the same amount of votes then do nothing
      if (Object.values(characterIDToKill).filter((value) => value === max).length > 1) {
        this.logger.verbose('MORE_THAN_ONE_CHARACTER_WITH_SAME_VOTES');
        return;
      }

      const character = characters.find(
        (character) => character.id === Object.keys(characterIDToKill).find((key) => characterIDToKill[key] === max),
      );

      if (!character) {
        this.logger.error('CHARACTER_NOT_FOUND');
        throw new HttpException('CHARACTER_NOT_FOUND', HttpStatus.NOT_FOUND);
      }

      const characterToKill = this.eventPublisher.mergeObjectContext(character);

      let typeOfCharacterToKill: CharacterType;

      switch (game.phase) {
        case GamePhase.WEREWOLF:
          typeOfCharacterToKill = CharacterType.WEREWOLF;
          break;
        case GamePhase.VILLAGER:
          typeOfCharacterToKill = CharacterType.VILLAGER;
          break;
        case GamePhase.WITCH:
          typeOfCharacterToKill = CharacterType.WITCH;
          break;
        case GamePhase.SEER:
          typeOfCharacterToKill = CharacterType.SEER;
          break;
      }

      console.log('typeOfCharacterToKill', typeOfCharacterToKill);

      characterToKill.kill(typeOfCharacterToKill);

      console.log('characterToKill', characterToKill);

      await this.characterService.save(characterToKill);

      characterToKill.commit();
    }
  }
}
