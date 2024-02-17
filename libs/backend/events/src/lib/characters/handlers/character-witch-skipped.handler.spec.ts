import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CharacterWitchSkippedEvent } from '../impl';
import { CharacterWitchSkippedHandler } from './character-witch-skipped.handler';

describe('CharacterWitchSkippedHandler', () => {
  let gameCreatedHandler: CharacterWitchSkippedHandler;
  let loggerSpy: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharacterWitchSkippedHandler],
    }).compile();

    gameCreatedHandler = module.get<CharacterWitchSkippedHandler>(CharacterWitchSkippedHandler);

    loggerSpy = gameCreatedHandler['logger'];
    jest.spyOn(loggerSpy, 'debug');

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(gameCreatedHandler).toBeDefined();
  });

  describe('handle', () => {
    it('should call the logger', async () => {
      await gameCreatedHandler.handle(new CharacterWitchSkippedEvent('123'));

      expect(loggerSpy.debug).toHaveBeenCalledWith('Handler...');
    });
  });
});
