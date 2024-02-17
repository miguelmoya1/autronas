import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GameGateway } from '@sleep-valley/backend/gateways';
import { GameFinishedEvent } from '../impl/game-finished.event';
import { GameFinishedHandler } from './game-finished.handler';

jest.mock('@sleep-valley/backend/gateways');

describe('GameFinishedHandler', () => {
  let gameFinishedHandler: GameFinishedHandler;
  let loggerSpy: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameFinishedHandler, GameGateway],
    }).compile();

    gameFinishedHandler = module.get<GameFinishedHandler>(GameFinishedHandler);

    loggerSpy = gameFinishedHandler['logger'];
    jest.spyOn(loggerSpy, 'debug');

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(gameFinishedHandler).toBeDefined();
  });

  describe('handle', () => {
    it('should call the logger', async () => {
      await gameFinishedHandler.handle(new GameFinishedEvent('1'));

      expect(loggerSpy.debug).toHaveBeenCalledWith('Handler...');
    });
  });
});
