import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { GameEntity } from '@sleep-valley/backend/entities';
import { GameService } from '@sleep-valley/backend/services';
import { GameGenerateCodeCommand } from '../impl/game-generate-code.command';

@CommandHandler(GameGenerateCodeCommand)
export class GameGenerateCodeHandler implements ICommandHandler<GameGenerateCodeCommand> {
  private readonly logger = new Logger(GameGenerateCodeHandler.name);

  constructor(
    private readonly gameService: GameService,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: GameGenerateCodeCommand) {
    this.logger.debug('Handler...');

    const { gameID } = command;

    const gameDB = await this.gameService.get(gameID, {});

    if (!gameDB) {
      this.logger.error('GAME_NOT_FOUND');
      throw new HttpException('GAME_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const game = this.eventPublisher.mergeObjectContext(gameDB);

    const code = await this.getCode();

    game.setCode(code);

    await this.gameService.save(game);

    game.commit();
  }

  private async getCode(): Promise<string> {
    this.logger.debug('Inside [GameGenerateCodeHandler] getCode...');
    const code = GameEntity.generateRandomCode();
    const isUnique = await this.gameService.isUniqueCode(code);

    if (!isUnique) {
      return this.getCode();
    }

    return code;
  }
}
