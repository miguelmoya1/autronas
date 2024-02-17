import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { CharacterService, GameService, VotesService } from '@sleep-valley/backend/services';
import { CharacterKillByVotesHandler } from './character-kill-by-votes.handler';

jest.mock('@sleep-valley/backend/services');

describe('CharacterKillByVotesHandler', () => {
  let userKillHandler: CharacterKillByVotesHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [CharacterKillByVotesHandler, CharacterService, GameService, VotesService],
    }).compile();

    userKillHandler = module.get<CharacterKillByVotesHandler>(CharacterKillByVotesHandler);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userKillHandler).toBeDefined();
  });

  // TODO: Add more tests
});
