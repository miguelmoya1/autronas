import { UserEntity } from '@autronas/backend/entities';
import { userMock } from '@autronas/backend/testing';

export class UsersService {
  readonly get = jest.fn().mockImplementation(async (id: UserEntity['id']) => {
    return new UserEntity({ ...userMock, id }, { ...userMock, id });
  });

  readonly getLogged = jest
    .fn()
    .mockImplementation(async (id: UserEntity['id']) => {
      if (id === 'error') {
        return null;
      }

      return new UserEntity({ ...userMock, id }, { ...userMock, id });
    });

  readonly getByEmail = jest
    .fn()
    .mockImplementation(async (email: UserEntity['email']) => {
      if (email === 'error') {
        return null;
      }

      return new UserEntity({ ...userMock, email }, { ...userMock, email });
    });

  readonly createByGoogle = jest
    .fn()
    .mockImplementation(async (user: UserEntity) => {
      if (user.email === 'error') {
        return null;
      }

      return new UserEntity(
        { ...userMock, email: user.email },
        { ...userMock, email: user.email },
      );
    });

  readonly update = jest.fn().mockImplementation(async (user: UserEntity) => {
    if (user.email === 'error' || user.id === 'error') {
      return null;
    }

    return new UserEntity(
      { ...userMock, email: user.email },
      { ...userMock, email: user.email },
    );
  });

  readonly getInGame = jest
    .fn()
    .mockImplementation(async (id: UserEntity['id']) => {
      if (id === 'error') {
        return null;
      }

      return new UserEntity({ ...userMock, id }, { ...userMock, id });
    });
}
