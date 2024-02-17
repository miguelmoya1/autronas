import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GameGateway } from '@sleep-valley/backend/gateways';
import { GameCodeCreatedEvent } from '../impl/game-code-created.event';
import { GameCodeCreatedHandler } from './game-code-created.handler';

jest.mock('@sleep-valley/backend/gateways');

describe('GameCodeCreatedHandler', () => {
  let gameCodeCreatedHandler: GameCodeCreatedHandler;
  let loggerSpy: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameCodeCreatedHandler, GameGateway],
    }).compile();

    gameCodeCreatedHandler = module.get<GameCodeCreatedHandler>(GameCodeCreatedHandler);

    loggerSpy = gameCodeCreatedHandler['logger'];
    jest.spyOn(loggerSpy, 'debug');

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(gameCodeCreatedHandler).toBeDefined();
  });

  describe('handle', () => {
    it('should call the logger', async () => {
      await gameCodeCreatedHandler.handle(new GameCodeCreatedEvent('1'));

      expect(loggerSpy.debug).toHaveBeenCalledWith('Handler...');
    });
  });
});
