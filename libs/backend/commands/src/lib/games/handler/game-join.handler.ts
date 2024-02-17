import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { GameService, UsersService } from '@sleep-valley/backend/services';
import { GameJoinCommand } from '../impl/game-join.command';

@CommandHandler(GameJoinCommand)
export class GameJoinHandler implements ICommandHandler<GameJoinCommand> {
  private readonly logger = new Logger(GameJoinHandler.name);

  constructor(
    private readonly gameService: GameService,
    private readonly userService: UsersService,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: GameJoinCommand) {
    this.logger.debug('Handler...');

    const { gameID, userID, user } = command;

    const gameDB = await this.gameService.get(gameID, user);

    if (!gameDB) {
      this.logger.error('GAME_NOT_FOUND');
      throw new HttpException('GAME_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const game = this.eventPublisher.mergeObjectContext(gameDB);

    const userToJoin = await this.userService.get(userID, user);

    if (!userToJoin) {
      this.logger.error('USER_NOT_FOUND');
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    if (!game.permissions.canAddUsers) {
      this.logger.error('GAME_CANNOT_ADD_PLAYERS');
      throw new HttpException('GAME_CANNOT_ADD_PLAYERS', HttpStatus.BAD_REQUEST);
    }

    if (!game.hasUserRequest(userToJoin)) {
      this.logger.error('USER_NOT_REQUESTED');
      throw new HttpException('USER_NOT_REQUESTED', HttpStatus.BAD_REQUEST);
    }

    if (game.hasUser(userToJoin)) {
      this.logger.error('USER_ALREADY_IN_GAME');
      throw new HttpException('USER_ALREADY_IN_GAME', HttpStatus.BAD_REQUEST);
    }

    game.join(userToJoin);

    await this.gameService.join(gameID, userID);

    game.commit();
  }
}
