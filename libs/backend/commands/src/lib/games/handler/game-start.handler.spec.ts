import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from '@sleep-valley/backend/services';
import { GameStartHandler } from './game-start.handler';

describe('GameStartHandler', () => {
  let gameStartHandler: GameStartHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        GameStartHandler,
        {
          provide: GameService,
          useValue: {},
        },
      ],
    }).compile();

    gameStartHandler = module.get<GameStartHandler>(GameStartHandler);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(gameStartHandler).toBeDefined();
  });
});
