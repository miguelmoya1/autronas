import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from '@sleep-valley/backend/services';
import { GameGenerateCodeHandler } from './game-generate-code.handler';

describe('GameGenerateCodeHandler', () => {
  let gameGenerateCodeHandler: GameGenerateCodeHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        GameGenerateCodeHandler,
        {
          provide: GameService,
          useValue: {},
        },
      ],
    }).compile();

    gameGenerateCodeHandler = module.get<GameGenerateCodeHandler>(GameGenerateCodeHandler);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(gameGenerateCodeHandler).toBeDefined();
  });
});
