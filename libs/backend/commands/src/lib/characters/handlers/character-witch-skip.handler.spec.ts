import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { CharacterService, GameService, VotesService } from '@sleep-valley/backend/services';
import { CharacterWitchSkipHandler } from './character-witch-skip.handler';

jest.mock('@sleep-valley/backend/services');

describe('CharacterWitchSkipHandler', () => {
  let userWitchSkipHandler: CharacterWitchSkipHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [CharacterWitchSkipHandler, CharacterService, GameService, VotesService],
    }).compile();

    userWitchSkipHandler = module.get<CharacterWitchSkipHandler>(CharacterWitchSkipHandler);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userWitchSkipHandler).toBeDefined();
  });

  // TODO: Add more tests
});
