import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from '@sleep-valley/backend/entities';
import { GameService } from '@sleep-valley/backend/services';
import { GameGetRequestsQuery } from '../impl/game-get-requests.query';
import { GameGetRequestsHandler } from './game-get-requests.handler';

jest.mock('@sleep-valley/backend/services');

describe('GameGetRequestsHandler', () => {
  let gameGetRequestsHandler: GameGetRequestsHandler;
  let gameService: GameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameGetRequestsHandler, GameService],
    }).compile();

    gameGetRequestsHandler = module.get(GameGetRequestsHandler);
    gameService = module.get(GameService);
  });

  it('should be defined', () => {
    expect(gameGetRequestsHandler).toBeDefined();
  });

  describe('execute', () => {
    it('should call the gameService.get function', async () => {
      const query = new GameGetRequestsQuery('gameID', {} as UserEntity);

      await gameGetRequestsHandler.execute(query);

      expect(gameService.getRequests).toHaveBeenCalledWith('gameID');
    });
  });
});
