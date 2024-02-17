import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from '@sleep-valley/backend/services';
import { GameCreateHandler } from './game-create.handler';

describe('GameCreateHandler', () => {
  let gameCreateHandler: GameCreateHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        GameCreateHandler,
        {
          provide: GameService,
          useValue: {},
        },
      ],
    }).compile();

    gameCreateHandler = module.get<GameCreateHandler>(GameCreateHandler);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(gameCreateHandler).toBeDefined();
  });
});
