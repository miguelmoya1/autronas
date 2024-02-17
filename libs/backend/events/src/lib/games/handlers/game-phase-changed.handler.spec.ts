import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GameGateway } from '@sleep-valley/backend/gateways';
import { GamePhaseChangedEvent } from '../impl/game-phase-changed.event';
import { GamePhaseChangedHandler } from './game-phase-changed.handler';

jest.mock('@sleep-valley/backend/gateways');

describe('GamePhaseChangedHandler', () => {
  let gamePhaseChangedHandler: GamePhaseChangedHandler;
  let loggerSpy: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GamePhaseChangedHandler, GameGateway],
    }).compile();

    gamePhaseChangedHandler = module.get<GamePhaseChangedHandler>(GamePhaseChangedHandler);

    loggerSpy = gamePhaseChangedHandler['logger'];
    jest.spyOn(loggerSpy, 'debug');

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(gamePhaseChangedHandler).toBeDefined();
  });

  describe('handle', () => {
    it('should call the logger', async () => {
      await gamePhaseChangedHandler.handle(new GamePhaseChangedEvent('1'));

      expect(loggerSpy.debug).toHaveBeenCalledWith('Handler...');
    });
  });
});
