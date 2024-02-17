import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { VotesService } from '@sleep-valley/backend/services';
import { VoteConfirmHandler } from './vote-confirm.handler';

jest.mock('@sleep-valley/backend/services');

describe('VoteConfirmHandler', () => {
  let votesCreateHandler: VoteConfirmHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [VoteConfirmHandler, VotesService],
    }).compile();

    votesCreateHandler = module.get<VoteConfirmHandler>(VoteConfirmHandler);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(votesCreateHandler).toBeDefined();
  });
});
