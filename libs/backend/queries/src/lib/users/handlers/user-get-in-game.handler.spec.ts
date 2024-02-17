import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '@sleep-valley/backend/services';
import { User } from '@sleep-valley/core/interfaces';
import { UserGetInGameQuery } from '../impl';
import { UserGetInGameHandler } from './user-get-in-game.handler';

jest.mock('@sleep-valley/backend/services');

describe('UserGetInGameHandler', () => {
  let userGetAllHandler: UserGetInGameHandler;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGetInGameHandler, UsersService],
    }).compile();

    userGetAllHandler = module.get<UserGetInGameHandler>(UserGetInGameHandler);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userGetAllHandler).toBeDefined();
  });

  describe('execute', () => {
    it('should call the userService.get function', async () => {
      const gameID = 'gameID';
      const userLogged = { id: '1' } as User;
      const query = new UserGetInGameQuery(gameID, userLogged);

      await userGetAllHandler.execute(query);

      expect(usersService.getInGame).toHaveBeenCalledWith(userLogged.id, gameID);
    });
  });
});
