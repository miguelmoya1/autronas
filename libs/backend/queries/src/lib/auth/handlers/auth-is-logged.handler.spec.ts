import { UserEntity } from '@autronas/backend/entities';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthRehydrateQuery } from '../impl/auth-rehydrate.query';
import { AuthIsLoggedHandler } from './auth-is-logged.handler';

describe('AuthIsLoggedHandler', () => {
  let handler: AuthIsLoggedHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthIsLoggedHandler],
    }).compile();

    handler = module.get<AuthIsLoggedHandler>(AuthIsLoggedHandler);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('execute', () => {
    it('should return false if the user do not have email or id', async () => {
      const user = new UserEntity({ id: '' }, {});
      const query = new AuthRehydrateQuery(user);

      const response = await handler.execute(query);

      expect(response).toBeFalsy();
    });

    it('should return true if the user have email and id', async () => {
      const user = new UserEntity({ id: 'id', email: 'email' }, {});
      const query = new AuthRehydrateQuery(user);

      const response = await handler.execute(query);

      expect(response).toBeTruthy();
    });
  });
});
