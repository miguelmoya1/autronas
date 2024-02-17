import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { GameService, UsersService } from '@sleep-valley/backend/services';
import { GameDeclineCommand } from '../impl/game-decline.command';

@CommandHandler(GameDeclineCommand)
export class GameDeclineHandler implements ICommandHandler<GameDeclineCommand> {
  private readonly logger = new Logger(GameDeclineHandler.name);

  constructor(
    private readonly gameService: GameService,
    private readonly userService: UsersService,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: GameDeclineCommand) {
    this.logger.debug('Handler...');

    const { gameID, userID, user } = command;

    const gameDB = await this.gameService.get(gameID, user);

    if (!gameDB) {
      this.logger.error('GAME_NOT_FOUND');
      throw new HttpException('GAME_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const game = this.eventPublisher.mergeObjectContext(gameDB);

    const userToDecline = await this.userService.get(userID, user);

    if (!userToDecline) {
      this.logger.error('USER_NOT_FOUND');
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    if (!game.permissions.canAddUsers) {
      this.logger.error('GAME_CANNOT_DECLINE_PLAYERS');
      throw new HttpException('GAME_CANNOT_DECLINE_PLAYERS', HttpStatus.BAD_REQUEST);
    }

    if (!game.hasUserRequest(userToDecline)) {
      this.logger.error('USER_NOT_REQUESTED');
      throw new HttpException('USER_NOT_REQUESTED', HttpStatus.BAD_REQUEST);
    }

    if (game.hasUser(userToDecline)) {
      this.logger.error('USER_ALREADY_IN_GAME');
      throw new HttpException('USER_ALREADY_IN_GAME', HttpStatus.BAD_REQUEST);
    }

    game.decline(userToDecline);

    await this.gameService.decline(gameID, userID);

    game.commit();
  }
}
