import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { VoteEntity } from '@sleep-valley/backend/entities';
import { CharacterService, GameService, VotesService } from '@sleep-valley/backend/services';
import { CharacterType, GamePhase } from '@sleep-valley/core/enums';
import { VoteCommand } from '../impl/vote.command';

@CommandHandler(VoteCommand)
export class VoteHandler implements ICommandHandler<VoteCommand> {
  private readonly logger = new Logger(VoteHandler.name);

  constructor(
    private readonly voteService: VotesService,
    private readonly characterService: CharacterService,
    private readonly gameService: GameService,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: VoteCommand) {
    this.logger.debug('Handler...');

    const {
      voteCreate: { characterID, gameID, isSkipped },
      user,
    } = command;

    if (!gameID) {
      this.logger.error('GAME_ID_IS_REQUIRED');
      throw new HttpException('GAME_ID_IS_REQUIRED', HttpStatus.BAD_REQUEST);
    }

    if (isSkipped && characterID) {
      this.logger.error('VOTE_IS_SKIPPED_AND_CHARACTER_ID_IS_SET');

      throw new HttpException('VOTE_IS_SKIPPED_AND_CHARACTER_ID_IS_SET', HttpStatus.BAD_REQUEST);
    }

    if (!isSkipped && !characterID) {
      this.logger.error('VOTE_IS_NOT_SKIPPED_AND_CHARACTER_ID_IS_NOT_SET');

      throw new HttpException('VOTE_IS_NOT_SKIPPED_AND_CHARACTER_ID_IS_NOT_SET', HttpStatus.BAD_REQUEST);
    }

    const game = await this.gameService.get(gameID, user);

    if (!game) {
      this.logger.error('GAME_NOT_FOUND');
      throw new HttpException('GAME_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    // if the user already voted and is confirmed, throw an error
    const myVote = await this.voteService.getMy(user.id, gameID);

    if (myVote?.isConfirmed) {
      this.logger.error('USER_ALREADY_VOTED');
      throw new HttpException('USER_ALREADY_VOTED', HttpStatus.BAD_REQUEST);
    }

    // if the user already voted and is not confirmed, delete the vote
    if (myVote && !myVote.isConfirmed) {
      this.logger.debug('Deleting vote...');
      const vote = this.eventPublisher.mergeObjectContext(myVote);

      vote.delete();

      await this.voteService.save(vote);
    }

    let voteEntity: VoteEntity | undefined;

    if (isSkipped) {
      if (game.phase === GamePhase.WEREWOLF) {
        this.logger.error('CANNOT_SKIP_IN_THIS_PHASE');
        throw new HttpException('CANNOT_SKIP_IN_THIS_PHASE', HttpStatus.BAD_REQUEST);
      }

      voteEntity = new VoteEntity({ gameID, ownerID: user.id, isSkipped });
    } else if (characterID) {
      const character = await this.characterService.get(characterID, user);

      if (!character) {
        this.logger.error('CHARACTER_NOT_FOUND');
        throw new HttpException('CHARACTER_NOT_FOUND', HttpStatus.NOT_FOUND);
      }

      if (!character.isAlive) {
        this.logger.error('CHARACTER_IS_DEAD');
        throw new HttpException('CHARACTER_IS_DEAD', HttpStatus.BAD_REQUEST);
      }

      if (character.ownerID === user.id) {
        this.logger.error('CHARACTER_IS_OWNED_BY_USER');
        throw new HttpException('CHARACTER_IS_OWNED_BY_USER', HttpStatus.BAD_REQUEST);
      }

      if (character.gameID !== gameID) {
        this.logger.error('CHARACTER_IS_NOT_IN_GAME');
        throw new HttpException('CHARACTER_IS_NOT_IN_GAME', HttpStatus.BAD_REQUEST);
      }

      const characterIsInTheSamePhaseAsGame =
        (character.type === CharacterType.WEREWOLF && game.phase === GamePhase.WEREWOLF) || false;

      if (game.phase !== GamePhase.VILLAGER && characterIsInTheSamePhaseAsGame) {
        this.logger.error('CHARACTER_IS_NOT_SAME_PHASE_AS_GAME');
        throw new HttpException('CHARACTER_IS_NOT_SAME_PHASE_AS_GAME', HttpStatus.BAD_REQUEST);
      }

      voteEntity = new VoteEntity({ gameID, characterID, ownerID: user.id });
    }

    this.logger.debug('Creating vote...');
    const vote = this.eventPublisher.mergeObjectContext(voteEntity!);

    vote.create();

    await this.voteService.create(vote);

    vote.commit();
  }
}
