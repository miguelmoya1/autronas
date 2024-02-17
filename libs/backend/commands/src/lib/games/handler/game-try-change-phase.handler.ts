import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CharacterService, GameService } from '@sleep-valley/backend/services';
import { CharacterType, GamePhase, GameStatus } from '@sleep-valley/core/enums';
import { GameTryChangePhaseCommand } from '../impl/game-try-change-phase.command';

@CommandHandler(GameTryChangePhaseCommand)
export class GameTryChangePhaseHandler implements ICommandHandler<GameTryChangePhaseCommand> {
  private readonly logger = new Logger(GameTryChangePhaseHandler.name);
  constructor(
    private readonly gameService: GameService,
    private readonly characterService: CharacterService,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: GameTryChangePhaseCommand) {
    this.logger.debug('Handler...');

    const { gameID } = command;

    const gameDB = await this.gameService.get(gameID, {});

    if (!gameDB) {
      this.logger.error('GAME_NOT_FOUND');
      throw new HttpException('GAME_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const game = this.eventPublisher.mergeObjectContext(gameDB);

    if (game.status !== GameStatus.STARTED) {
      this.logger.error('GAME_NOT_STARTED');
      throw new HttpException('GAME_NOT_STARTED', HttpStatus.BAD_REQUEST);
    }

    const characters = await this.characterService.getAllInGame(gameID, {});

    let canChangePhase = false;

    const werewolves = characters?.filter((c) => c.type === CharacterType.WEREWOLF);

    switch (game.phase) {
      case GamePhase.WEREWOLF:
        if (game.Votes.length === werewolves.length) {
          this.logger.verbose('WEREWOLF_PHASE_FINISHED');
          canChangePhase = true;
        }
        break;
      case GamePhase.VILLAGER:
        if (game.Votes.length === characters.length) {
          this.logger.verbose('VILLAGER_PHASE_FINISHED');
          canChangePhase = true;
        }
        break;
      case GamePhase.WITCH:
        canChangePhase = true;
        break;
      case GamePhase.SEER:
        canChangePhase = true;
        break;
    }

    if (!canChangePhase) {
      this.logger.error('CANNOT_CHANGE_PHASE');
      throw new HttpException('CANNOT_CHANGE_PHASE', HttpStatus.BAD_REQUEST);
    }

    game.nextPhase(characters);

    await this.gameService.save(game);

    game.commit();
  }
}
