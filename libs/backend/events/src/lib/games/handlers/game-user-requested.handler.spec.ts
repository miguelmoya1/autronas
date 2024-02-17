import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GameGateway } from '@sleep-valley/backend/gateways';
import { GameUserRequestedEvent } from '../impl/game-user-requested.event';
import { GameUserRequestedHandler } from './game-user-requested.handler';

jest.mock('@sleep-valley/backend/gateways');

describe('GameUserRequestedHandler', () => {
  let gameUserRequestedHandler: GameUserRequestedHandler;
  let loggerSpy: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameUserRequestedHandler, GameGateway],
    }).compile();

    gameUserRequestedHandler = module.get<GameUserRequestedHandler>(GameUserRequestedHandler);

    loggerSpy = gameUserRequestedHandler['logger'];
    jest.spyOn(loggerSpy, 'debug');

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(gameUserRequestedHandler).toBeDefined();
  });

  describe('handle', () => {
    it('should call the logger', async () => {
      await gameUserRequestedHandler.handle(new GameUserRequestedEvent('123'));

      expect(loggerSpy.debug).toHaveBeenCalledWith('Handler...');
    });
  });
});
