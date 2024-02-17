import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from '@sleep-valley/backend/services';
import { GameRequestJoinFromCodeHandler } from './game-request-join-from-code.handler';

describe('GameRequestJoinFromCodeHandler', () => {
  let gameRequestJoinFromCodeHandler: GameRequestJoinFromCodeHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        GameRequestJoinFromCodeHandler,
        {
          provide: GameService,
          useValue: {},
        },
      ],
    }).compile();

    gameRequestJoinFromCodeHandler = module.get<GameRequestJoinFromCodeHandler>(GameRequestJoinFromCodeHandler);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(gameRequestJoinFromCodeHandler).toBeDefined();
  });
});
