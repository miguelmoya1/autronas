import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { GameService, VotesService } from '@sleep-valley/backend/services';
import { VoteClearCommand } from '../impl/vote-clear.command';

@CommandHandler(VoteClearCommand)
export class VoteClearHandler implements ICommandHandler<VoteClearCommand> {
  private readonly logger = new Logger(VoteClearHandler.name);

  constructor(
    private readonly voteService: VotesService,
    private readonly gameService: GameService,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: VoteClearCommand) {
    this.logger.debug('Handler...');

    const { gameID } = command;

    const gameDB = await this.gameService.get(gameID, {});

    if (!gameDB) {
      throw new HttpException('GAME_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const game = this.eventPublisher.mergeObjectContext(gameDB);

    game.clearVotes();

    await this.voteService.clearVotes(game);

    game.commit();
  }
}
