import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GameGateway } from '@sleep-valley/backend/gateways';
import { GameJoinedEvent } from '../impl/game-joined.event';
import { GameJoinedHandler } from './game-joined.handler';

jest.mock('@sleep-valley/backend/gateways');

describe('GameJoinedHandler', () => {
  let gameJoinedHandler: GameJoinedHandler;
  let loggerSpy: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameJoinedHandler, GameGateway],
    }).compile();

    gameJoinedHandler = module.get<GameJoinedHandler>(GameJoinedHandler);

    loggerSpy = gameJoinedHandler['logger'];
    jest.spyOn(loggerSpy, 'debug');

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(gameJoinedHandler).toBeDefined();
  });

  describe('handle', () => {
    it('should call the logger', async () => {
      await gameJoinedHandler.handle(new GameJoinedEvent('123'));

      expect(loggerSpy.debug).toHaveBeenCalledWith('Handler...');
    });
  });
});
