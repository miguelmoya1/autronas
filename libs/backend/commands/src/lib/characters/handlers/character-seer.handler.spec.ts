import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { CharacterService, GameService } from '@sleep-valley/backend/services';
import { CharacterSeerHandler } from './character-seer.handler';

jest.mock('@sleep-valley/backend/services');

describe('CharacterSeerHandler', () => {
  let userSeerHandler: CharacterSeerHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [CharacterSeerHandler, CharacterService, GameService],
    }).compile();

    userSeerHandler = module.get<CharacterSeerHandler>(CharacterSeerHandler);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userSeerHandler).toBeDefined();
  });

  // TODO: Add more tests
});
