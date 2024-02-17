import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { VotesService } from '@sleep-valley/backend/services';
import { VoteConfirmCommand } from '../impl/vote-confirm.command';

@CommandHandler(VoteConfirmCommand)
export class VoteConfirmHandler implements ICommandHandler<VoteConfirmCommand> {
  private readonly logger = new Logger(VoteConfirmHandler.name);

  constructor(
    private readonly voteService: VotesService,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: VoteConfirmCommand) {
    this.logger.debug('Handler...');

    const { gameID, user } = command;

    const voteDB = await this.voteService.getMy(user.id, gameID);

    if (!voteDB) {
      this.logger.error('VOTE_NOT_FOUND');
      throw new HttpException('VOTE_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const vote = this.eventPublisher.mergeObjectContext(voteDB);

    vote.confirm();

    await this.voteService.save(vote);

    vote.commit();
  }
}
