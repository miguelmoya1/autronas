import { Test, TestingModule } from '@nestjs/testing';
import { GameGateway } from '@sleep-valley/backend/gateways';
import { VoteClearedEvent } from '../impl/vote-cleared.event';
import { VoteClearedHandler } from './vote-cleared.handler';

jest.mock('@sleep-valley/backend/gateways');

describe('VoteClearedHandler', () => {
  let handler: VoteClearedHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VoteClearedHandler, GameGateway],
    }).compile();

    handler = module.get<VoteClearedHandler>(VoteClearedHandler);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('handle', () => {
    it('should call the logger', async () => {
      const loggerSpy = jest.spyOn(handler['logger'], 'debug');

      await handler.handle(new VoteClearedEvent('123'));

      expect(loggerSpy).toHaveBeenCalledWith('Handler...');
    });
  });
});
