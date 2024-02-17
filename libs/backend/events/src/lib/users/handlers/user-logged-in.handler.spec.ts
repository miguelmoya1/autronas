import { Test, TestingModule } from '@nestjs/testing';
import { UserLoggedInHandler } from './user-logged-in.handler';

describe('UserLoggedInHandler', () => {
  let handler: UserLoggedInHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserLoggedInHandler],
    }).compile();

    handler = module.get<UserLoggedInHandler>(UserLoggedInHandler);
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
