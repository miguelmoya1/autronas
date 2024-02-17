import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { GameService } from '@sleep-valley/backend/services';
import { GameStartCommand } from '../impl/game-start.command';

@CommandHandler(GameStartCommand)
export class GameStartHandler implements ICommandHandler<GameStartCommand> {
  private readonly logger = new Logger(GameStartHandler.name);

  constructor(
    private readonly gameService: GameService,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: GameStartCommand) {
    this.logger.debug('Handler...');

    const { gameID, user } = command;

    const gameDB = await this.gameService.get(gameID, user);

    if (!gameDB) {
      this.logger.error('GAME_NOT_FOUND');
      throw new HttpException('GAME_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const game = this.eventPublisher.mergeObjectContext(gameDB);

    if (!game.permissions.canStartGame) {
      if (game.status !== 'PREPARING') {
        this.logger.error('GAME_ALREADY_STARTED');
        throw new HttpException('GAME_ALREADY_STARTED', HttpStatus.FORBIDDEN);
      }

      if (!game.hasEnoughUsers) {
        this.logger.error('GAME_NOT_ENOUGH_USERS');
        throw new HttpException('GAME_NOT_ENOUGH_USERS', HttpStatus.FORBIDDEN);
      }

      this.logger.error('GAME_CANNOT_START');
      throw new HttpException('GAME_CANNOT_START', HttpStatus.FORBIDDEN);
    }

    game.start();

    await this.gameService.save(game);

    game.commit();
  }
}
