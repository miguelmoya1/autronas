import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from '@sleep-valley/backend/services';
import { User } from '@sleep-valley/core/interfaces';
import { GameGetQuery } from '../impl/game-get.query';
import { GameGetHandler } from './game-get.handler';

describe('GameGetHandler', () => {
  let gameGetHandler: GameGetHandler;
  let gameService: GameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameGetHandler,
        {
          provide: GameService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    gameGetHandler = module.get<GameGetHandler>(GameGetHandler);
    gameService = module.get<GameService>(GameService);
  });

  it('should be defined', () => {
    expect(gameGetHandler).toBeDefined();
  });

  describe('execute', () => {
    it('should call the gameService.get function', async () => {
      const userLogged = { id: '1' } as User;
      const query = new GameGetQuery('123', userLogged);

      await gameGetHandler.execute(query);

      expect(gameService.get).toHaveBeenCalledWith('123', userLogged);
    });
  });
});
