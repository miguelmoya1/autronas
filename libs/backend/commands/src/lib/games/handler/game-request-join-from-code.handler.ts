import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { GameService } from '@sleep-valley/backend/services';
import { GameRequestJoinFromCodeCommand } from '../impl/game-request-join-from-code.command';

@CommandHandler(GameRequestJoinFromCodeCommand)
export class GameRequestJoinFromCodeHandler implements ICommandHandler<GameRequestJoinFromCodeCommand> {
  private readonly logger = new Logger(GameRequestJoinFromCodeHandler.name);

  constructor(
    private readonly gameService: GameService,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: GameRequestJoinFromCodeCommand) {
    this.logger.debug('Handler...');

    const { code, user } = command;

    const gameDB = await this.gameService.getByCode(code, user);

    if (!gameDB) {
      this.logger.error('GAME_NOT_FOUND');
      throw new HttpException('GAME_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const game = this.eventPublisher.mergeObjectContext(gameDB);

    const hasUserRequest = game.hasUserRequest(user);

    if (hasUserRequest) {
      this.logger.error('USER_ALREADY_REQUESTED');
      throw new HttpException('USER_ALREADY_REQUESTED', HttpStatus.CONFLICT);
    }

    const hasUser = game.hasUser(user);

    if (hasUser) {
      this.logger.error('USER_ALREADY_IN_GAME');
      throw new HttpException('USER_ALREADY_IN_GAME', HttpStatus.CONFLICT);
    }

    game.requestJoin(user);

    await this.gameService.requestJoin(game.id, user.id);

    game.commit();
  }
}
