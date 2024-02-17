import { UsersService } from '@autronas/backend/services';
import { User } from '@autronas/core/interfaces';
import { Test, TestingModule } from '@nestjs/testing';
import { UserGetLoggedQuery } from '../impl';
import { UserGetLoggedHandler } from './user-get-logged.handler';

jest.mock('@autronas/backend/services');

describe('UserGetLoggedHandler', () => {
  let userGetAllHandler: UserGetLoggedHandler;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGetLoggedHandler, UsersService],
    }).compile();

    userGetAllHandler = module.get<UserGetLoggedHandler>(UserGetLoggedHandler);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userGetAllHandler).toBeDefined();
  });

  describe('execute', () => {
    it('should call the userService.get function', async () => {
      const gameID = 'gameID';
      const userLogged = { id: '1' } as User;
      const query = new UserGetLoggedQuery(userLogged);

      await userGetAllHandler.execute(query);

      expect(usersService.getLogged).toHaveBeenCalledWith(
        userLogged.id,
        gameID,
      );
    });
  });
});
