import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GameGateway } from '@sleep-valley/backend/gateways';
import { GameCharactersCreatedEvent } from '../impl/game-characters-created.event';
import { GameCharactersCreatedHandler } from './game-characters-created.handler';

jest.mock('@sleep-valley/backend/gateways');

describe('GameCharactersCreatedHandler', () => {
  let gameCharactersCreatedHandler: GameCharactersCreatedHandler;
  let loggerSpy: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameCharactersCreatedHandler, GameGateway],
    }).compile();

    gameCharactersCreatedHandler = module.get<GameCharactersCreatedHandler>(GameCharactersCreatedHandler);

    loggerSpy = gameCharactersCreatedHandler['logger'];
    jest.spyOn(loggerSpy, 'debug');

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(gameCharactersCreatedHandler).toBeDefined();
  });

  describe('handle', () => {
    it('should call the logger', async () => {
      await gameCharactersCreatedHandler.handle(new GameCharactersCreatedEvent('123', ['123', '456']));

      expect(loggerSpy.debug).toHaveBeenCalledWith('Handler...');
    });
  });
});
