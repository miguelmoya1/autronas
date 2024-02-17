import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { CharacterService, GameService, VotesService } from '@sleep-valley/backend/services';
import { CharacterKillByWitchHandler } from './character-kill-by-witch.handler';

jest.mock('@sleep-valley/backend/services');

describe('CharacterKillByWitchHandler', () => {
  let userKillByWitchHandler: CharacterKillByWitchHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [CharacterKillByWitchHandler, CharacterService, GameService, VotesService],
    }).compile();

    userKillByWitchHandler = module.get<CharacterKillByWitchHandler>(CharacterKillByWitchHandler);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userKillByWitchHandler).toBeDefined();
  });

  // TODO: Add more tests
});
