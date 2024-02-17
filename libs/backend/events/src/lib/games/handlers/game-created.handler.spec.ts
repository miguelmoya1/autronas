import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GameGateway } from '@sleep-valley/backend/gateways';
import { GameCreatedEvent } from '../impl/game-created.event';
import { GameCreatedHandler } from './game-created.handler';

describe('GameCreatedHandler', () => {
  let gameCreatedHandler: GameCreatedHandler;
  let loggerSpy: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameCreatedHandler,
        {
          provide: GameGateway,
          useValue: {
            sendToRoom: jest.fn(),
          },
        },
      ],
    }).compile();

    gameCreatedHandler = module.get<GameCreatedHandler>(GameCreatedHandler);

    loggerSpy = gameCreatedHandler['logger'];
    jest.spyOn(loggerSpy, 'debug');

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(gameCreatedHandler).toBeDefined();
  });

  describe('handle', () => {
    it('should call the logger', async () => {
      await gameCreatedHandler.handle(new GameCreatedEvent('1'));

      expect(loggerSpy.debug).toHaveBeenCalledWith('Handler...');
    });
  });
});
