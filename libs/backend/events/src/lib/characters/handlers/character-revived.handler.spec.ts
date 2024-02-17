import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GameGateway } from '@sleep-valley/backend/gateways';
import { CharacterRevivedEvent } from '../impl';
import { CharacterRevivedHandler } from './character-revived.handler';

jest.mock('@sleep-valley/backend/gateways');

describe('CharacterRevivedHandler', () => {
  let gameCreatedHandler: CharacterRevivedHandler;
  let loggerSpy: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharacterRevivedHandler, GameGateway],
    }).compile();

    gameCreatedHandler = module.get<CharacterRevivedHandler>(CharacterRevivedHandler);

    loggerSpy = gameCreatedHandler['logger'];
    jest.spyOn(loggerSpy, 'debug');

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(gameCreatedHandler).toBeDefined();
  });

  describe('handle', () => {
    it('should call the logger', async () => {
      await gameCreatedHandler.handle(new CharacterRevivedEvent('123'));

      expect(loggerSpy.debug).toHaveBeenCalledWith('Handler...');
    });
  });
});
