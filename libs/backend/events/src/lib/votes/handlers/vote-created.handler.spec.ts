import { Test, TestingModule } from '@nestjs/testing';
import { GameGateway } from '@sleep-valley/backend/gateways';
import { VoteCreatedEvent } from '../impl/vote-created.event';
import { VoteCreatedHandler } from './vote-created.handler';

jest.mock('@sleep-valley/backend/gateways');

describe('VoteCreatedHandler', () => {
  let handler: VoteCreatedHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VoteCreatedHandler, GameGateway],
    }).compile();

    handler = module.get<VoteCreatedHandler>(VoteCreatedHandler);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('handle', () => {
    it('should call the logger', async () => {
      const loggerSpy = jest.spyOn(handler['logger'], 'debug');

      await handler.handle(new VoteCreatedEvent('123'));

      expect(loggerSpy).toHaveBeenCalledWith('Handler...');
    });
  });
});
