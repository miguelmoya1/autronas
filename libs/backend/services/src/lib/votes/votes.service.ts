import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { VoteModel } from '@sleep-valley/backend/database';
import { VoteEntity } from '@sleep-valley/backend/entities';
import { Game, Vote } from '@sleep-valley/core/interfaces';

@Injectable()
export class VotesService {
  constructor(@InjectModel(VoteModel) private readonly voteModel: typeof VoteModel) {}

  public async get(id: VoteModel['id']) {
    const vote = await this.voteModel.findByPk(id, VoteModel.baseOptions);

    return vote ? new VoteEntity(vote.toJSON()) : null;
  }

  public async create(vote: Vote) {
    await this.voteModel.create({ ...vote });
  }

  public async getMultiple(ids: VoteModel['id'][]) {
    const votes = await this.voteModel.findAll({
      ...VoteModel.baseOptions,
      where: { id: ids },
    });

    return votes.map((vote) => new VoteEntity(vote.toJSON()));
  }

  public async getMy(ownerID: string, gameID: string) {
    const vote = await this.voteModel.findOne({
      ...VoteModel.baseOptions,
      where: { ownerID, gameID },
    });

    return vote ? new VoteEntity(vote.toJSON()) : null;
  }

  public async clearVotes(game: Game) {
    await this.voteModel.destroy({
      where: { gameID: game.id },
      force: true,
    });
  }

  public async save(vote: VoteEntity) {
    await this.voteModel.update(vote, {
      where: { id: vote.id },
    });
  }
}
