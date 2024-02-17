import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { GameService, UsersService } from '@sleep-valley/backend/services';
import { GameJoinHandler } from './game-join.handler';

describe('GameJoinHandler', () => {
  let gameJoinHandler: GameJoinHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        GameJoinHandler,
        {
          provide: GameService,
          useValue: {},
        },
        {
          provide: UsersService,
          useValue: {},
        },
      ],
    }).compile();

    gameJoinHandler = module.get<GameJoinHandler>(GameJoinHandler);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(gameJoinHandler).toBeDefined();
  });
});
