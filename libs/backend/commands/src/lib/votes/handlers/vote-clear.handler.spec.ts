import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { GameService, VotesService } from '@sleep-valley/backend/services';
import { VoteClearHandler } from './vote-clear.handler';

jest.mock('@sleep-valley/backend/services');

describe('VoteClearHandler', () => {
  let votesCreateHandler: VoteClearHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [VoteClearHandler, VotesService, GameService],
    }).compile();

    votesCreateHandler = module.get<VoteClearHandler>(VoteClearHandler);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(votesCreateHandler).toBeDefined();
  });
});
