import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { GameEntity } from '@sleep-valley/backend/entities';
import { GameService } from '@sleep-valley/backend/services';
import { GameCreateCommand } from '../impl/game-create.command';

@CommandHandler(GameCreateCommand)
export class GameCreateHandler implements ICommandHandler<GameCreateCommand> {
  private readonly logger = new Logger(GameCreateHandler.name);

  constructor(
    private readonly gameService: GameService,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: GameCreateCommand) {
    this.logger.debug('Handler...');

    const { gameCreate, user } = command;

    const game = this.eventPublisher.mergeObjectContext(new GameEntity(gameCreate, user));

    const gameToCreate = {
      ...game,
      ownerID: user.id,
    } as GameEntity;

    const { id: gameID } = await this.gameService.create(gameToCreate);

    game.create(gameID, user);

    await this.gameService.join(gameID, user.id);

    game.commit();
  }
}
