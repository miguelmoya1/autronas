import { UserEntity } from '@sleep-valley/backend/entities';
import { userMock } from '@sleep-valley/backend/testing';

export class UsersService {
  readonly get = jest.fn().mockImplementation(async (id: UserEntity['id']) => {
    return new UserEntity({ ...userMock, id }, { ...userMock, id });
  });

  readonly getLogged = jest.fn().mockImplementation(async (id: UserEntity['id']) => {
    return new UserEntity({ ...userMock, id }, { ...userMock, id });
  });

  readonly getByEmail = jest.fn().mockImplementation(async (email: UserEntity['email']) => {
    return new UserEntity({ ...userMock, email }, { ...userMock, email });
  });

  readonly createByGoogle = jest.fn().mockImplementation(async (user: UserEntity) => {
    user;
  });

  readonly update = jest.fn().mockImplementation(async (user: UserEntity) => {
    user;
  });

  readonly getInGame = jest.fn().mockImplementation(async (id: UserEntity['id']) => {
    return new UserEntity({ ...userMock, id }, { ...userMock, id });
  });
}
