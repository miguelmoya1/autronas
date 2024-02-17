import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GameGateway } from '@sleep-valley/backend/gateways';
import { CharacterKilledEvent } from '../impl';
import { CharacterKilledHandler } from './character-killed.handler';

jest.mock('@sleep-valley/backend/gateways');

describe('CharacterKilledHandler', () => {
  let gameCreatedHandler: CharacterKilledHandler;
  let loggerSpy: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharacterKilledHandler, GameGateway],
    }).compile();

    gameCreatedHandler = module.get<CharacterKilledHandler>(CharacterKilledHandler);

    loggerSpy = gameCreatedHandler['logger'];
    jest.spyOn(loggerSpy, 'debug');

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(gameCreatedHandler).toBeDefined();
  });

  describe('handle', () => {
    it('should call the logger', async () => {
      await gameCreatedHandler.handle(new CharacterKilledEvent('123'));

      expect(loggerSpy.debug).toHaveBeenCalledWith('Handler...');
    });
  });
});
