import { Test, TestingModule } from '@nestjs/testing';
import { UserRehydratedHandler } from './user-rehydrated.handler';

describe('UserRehydratedHandler', () => {
  let handler: UserRehydratedHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRehydratedHandler],
    }).compile();

    handler = module.get<UserRehydratedHandler>(UserRehydratedHandler);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('handle', () => {
    it('should call the logger', async () => {
      const loggerSpy = jest.spyOn(handler['logger'], 'debug');

      await handler.handle();

      expect(loggerSpy).toHaveBeenCalledWith('Handler...');
    });
  });
});
