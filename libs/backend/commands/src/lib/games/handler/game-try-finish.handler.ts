import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CharacterService, GameService } from '@sleep-valley/backend/services';
import { CharacterType, GameStatus } from '@sleep-valley/core/enums';
import { GameTryFinishCommand } from '../impl/game-try-finish.command';

@CommandHandler(GameTryFinishCommand)
export class GameTryFinishHandler implements ICommandHandler<GameTryFinishCommand> {
  private readonly logger = new Logger(GameTryFinishHandler.name);
  constructor(
    private readonly gameService: GameService,
    private readonly characterService: CharacterService,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: GameTryFinishCommand) {
    this.logger.debug('Handler...');

    const { gameID } = command;

    const gameDB = await this.gameService.get(gameID, {});

    if (!gameDB) {
      this.logger.error('GAME_NOT_FOUND');
      throw new HttpException('GAME_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const game = this.eventPublisher.mergeObjectContext(gameDB);

    let winner: CharacterType | undefined;
    if (game.status !== GameStatus.FINISHED) {
      const all = await this.characterService.getAllInGame(gameID, {});

      const werewolvesAlive = all.filter((c) => c.type === CharacterType.WEREWOLF).filter((c) => c.isAlive);

      const villagersAlive = all.filter((c) => c.type === CharacterType.VILLAGER).filter((c) => c.isAlive);

      if (werewolvesAlive.length === 0) {
        winner = CharacterType.VILLAGER;
      }

      if (villagersAlive.length === 0) {
        winner = CharacterType.WEREWOLF;
      }

      if (villagersAlive.length === werewolvesAlive.length) {
        winner = CharacterType.WEREWOLF;
      }

      if (winner) {
        game.finish(winner);

        await this.gameService.save(game);

        game.commit();
      }
    }
  }
}
