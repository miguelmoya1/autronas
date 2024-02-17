import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GameGateway } from '@sleep-valley/backend/gateways';
import { GameStartedEvent } from '../impl/game-started.event';
import { GameStartedHandler } from './game-started.handler';

jest.mock('@sleep-valley/backend/gateways');

describe('GameStartedHandler', () => {
  let gameStartedHandler: GameStartedHandler;
  let loggerSpy: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameStartedHandler, GameGateway],
    }).compile();

    gameStartedHandler = module.get<GameStartedHandler>(GameStartedHandler);

    loggerSpy = gameStartedHandler['logger'];
    jest.spyOn(loggerSpy, 'debug');

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(gameStartedHandler).toBeDefined();
  });

  describe('handle', () => {
    it('should call the logger', async () => {
      await gameStartedHandler.handle(new GameStartedEvent('1'));

      expect(loggerSpy.debug).toHaveBeenCalledWith('Handler...');
    });
  });
});
