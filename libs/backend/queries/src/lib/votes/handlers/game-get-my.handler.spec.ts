import { Test, TestingModule } from '@nestjs/testing';
import { VotesService } from '@sleep-valley/backend/services';
import { User } from '@sleep-valley/core/interfaces';
import { VoteGetMyQuery } from '../impl/vote-get-my.query';
import { VoteGetMyHandler } from './game-get-my.handler';

describe('VoteGetMyHandler', () => {
  let voteGetAllHandler: VoteGetMyHandler;
  let votesService: VotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VoteGetMyHandler,
        {
          provide: VotesService,
          useValue: {
            getMy: jest.fn(),
          },
        },
      ],
    }).compile();

    voteGetAllHandler = module.get<VoteGetMyHandler>(VoteGetMyHandler);
    votesService = module.get<VotesService>(VotesService);
  });

  it('should be defined', () => {
    expect(voteGetAllHandler).toBeDefined();
  });

  describe('execute', () => {
    it('should call the voteService.get function', async () => {
      const gameID = 'gameID';
      const userLogged = { id: '1' } as User;
      const query = new VoteGetMyQuery(gameID, userLogged);

      await voteGetAllHandler.execute(query);

      expect(votesService.getMy).toHaveBeenCalledWith(userLogged.id, gameID);
    });
  });
});
