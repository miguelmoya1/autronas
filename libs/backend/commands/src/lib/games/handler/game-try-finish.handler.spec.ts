import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { CharacterService, GameService } from '@sleep-valley/backend/services';
import { GameTryChangePhaseHandler } from './game-try-change-phase.handler';

describe('GameChangePhaseHandler', () => {
  let gameChangePhaseHandler: GameTryChangePhaseHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        GameTryChangePhaseHandler,
        {
          provide: GameService,
          useValue: {},
        },
        {
          provide: CharacterService,
          useValue: {},
        },
      ],
    }).compile();

    gameChangePhaseHandler = module.get<GameTryChangePhaseHandler>(GameTryChangePhaseHandler);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(gameChangePhaseHandler).toBeDefined();
  });
});
