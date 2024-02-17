import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from '@sleep-valley/backend/services';
import { User } from '@sleep-valley/core/interfaces';
import { GameGetAllQuery } from '../impl/game-get-all.query';
import { GameGetAllHandler } from './game-get-all.handler';

describe('GameGetAllHandler', () => {
  let gameGetAllHandler: GameGetAllHandler;
  let gameService: GameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameGetAllHandler,
        {
          provide: GameService,
          useValue: {
            getAll: jest.fn(),
          },
        },
      ],
    }).compile();

    gameGetAllHandler = module.get<GameGetAllHandler>(GameGetAllHandler);
    gameService = module.get<GameService>(GameService);
  });

  it('should be defined', () => {
    expect(gameGetAllHandler).toBeDefined();
  });

  describe('execute', () => {
    it('should call the gameService.get function', async () => {
      const userLogged: User = {} as User;
      const query = new GameGetAllQuery(userLogged);

      await gameGetAllHandler.execute(query);

      expect(gameService.getAll).toHaveBeenCalledWith(userLogged);
    });
  });
});
