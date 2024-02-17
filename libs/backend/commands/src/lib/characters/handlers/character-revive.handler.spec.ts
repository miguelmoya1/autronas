import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { CharacterService, GameService } from '@sleep-valley/backend/services';
import { CharacterReviveHandler } from './character-revive.handler';

jest.mock('@sleep-valley/backend/services');

describe('CharacterReviveHandler', () => {
  let userReviveHandler: CharacterReviveHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [CharacterReviveHandler, CharacterService, GameService],
    }).compile();

    userReviveHandler = module.get<CharacterReviveHandler>(CharacterReviveHandler);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userReviveHandler).toBeDefined();
  });

  // TODO: Add more tests
});
