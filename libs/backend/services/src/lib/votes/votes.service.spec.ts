import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { VoteModel } from '@sleep-valley/backend/database';
import { VotesService } from './votes.service';

describe('VotesService', () => {
  let service: VotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VotesService,
        {
          provide: getModelToken(VoteModel),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<VotesService>(VotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
