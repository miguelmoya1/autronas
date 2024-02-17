import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GameGateway } from '@sleep-valley/backend/gateways';
import { CharacterSeenEvent } from '../impl';
import { CharacterSeenHandler } from './character-seen.handler';

jest.mock('@sleep-valley/backend/gateways');

describe('CharacterSeenHandler', () => {
  let gameCreatedHandler: CharacterSeenHandler;
  let loggerSpy: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharacterSeenHandler, GameGateway],
    }).compile();

    gameCreatedHandler = module.get<CharacterSeenHandler>(CharacterSeenHandler);

    loggerSpy = gameCreatedHandler['logger'];
    jest.spyOn(loggerSpy, 'debug');

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(gameCreatedHandler).toBeDefined();
  });

  describe('handle', () => {
    it('should call the logger', async () => {
      await gameCreatedHandler.handle(new CharacterSeenEvent('123'));

      expect(loggerSpy.debug).toHaveBeenCalledWith('Handler...');
    });
  });
});
