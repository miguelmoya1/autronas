import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { CharacterService, GameService, VotesService } from '@sleep-valley/backend/services';
import { VoteHandler } from './vote.handler';

describe('VoteHandler', () => {
  let votesCreateHandler: VoteHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        VoteHandler,
        {
          provide: VotesService,
          useValue: {},
        },
        {
          provide: CharacterService,
          useValue: {},
        },
        {
          provide: GameService,
          useValue: {},
        },
      ],
    }).compile();

    votesCreateHandler = module.get<VoteHandler>(VoteHandler);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(votesCreateHandler).toBeDefined();
  });
});
