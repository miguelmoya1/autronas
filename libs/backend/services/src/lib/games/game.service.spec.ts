import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { GameModel } from '@sleep-valley/backend/database';
import { GameService } from './game.service';

describe('GameService', () => {
  let gameService: GameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameService,
        {
          provide: getModelToken(GameModel),
          useValue: {},
        },
      ],
    }).compile();

    gameService = module.get<GameService>(GameService);
  });

  it('Should be defined', () => {
    expect(gameService).toBeDefined();
  });
});
