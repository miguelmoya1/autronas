import { UserEntity } from '@autronas/backend/entities';
import { AuthService } from '@autronas/backend/services';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthRehydrateQuery } from '../impl/auth-rehydrate.query';
import { AuthRehydrateHandler } from './auth-rehydrate.handler';

jest.mock('@autronas/backend/services');

describe('AuthRehydrateHandler', () => {
  let handler: AuthRehydrateHandler;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthRehydrateHandler, AuthService],
    }).compile();

    handler = module.get<AuthRehydrateHandler>(AuthRehydrateHandler);

    authService = module.get<AuthService>(AuthService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('execute', () => {
    it('should call the authService.rehydrate function', async () => {
      const user = new UserEntity({ id: '' }, {});
      const query = new AuthRehydrateQuery(user);

      await handler.execute(query);

      expect(authService.rehydrate).toHaveBeenCalledTimes(1);
      expect(authService.rehydrate).toHaveBeenCalledWith(user);
    });

    it('should call the user.rehydrate function', async () => {
      const user = new UserEntity({ id: '' }, {});
      user.rehydrate = jest.fn();
      const query = new AuthRehydrateQuery(user);

      await handler.execute(query);

      expect(user.rehydrate).toHaveBeenCalledTimes(1);
    });

    it('should call the user.commit function', async () => {
      const user = new UserEntity({ id: '' }, {});
      user.commit = jest.fn();
      const query = new AuthRehydrateQuery(user);

      await handler.execute(query);

      expect(user.commit).toHaveBeenCalledTimes(1);
    });

    it('should return the token', async () => {
      const user = new UserEntity({ id: '' }, {});
      const query = new AuthRehydrateQuery(user);

      const response = await handler.execute(query);

      expect(response).toEqual({ token: 'token' });
    });
  });
});
