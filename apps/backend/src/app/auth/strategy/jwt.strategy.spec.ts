import { UsersService } from '@autronas/backend/services';
import { userMock } from '@autronas/backend/testing';
import { Test } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';

jest.mock('@autronas/backend/services');

describe('JwtStrategy', () => {
  it('should be defined', () => {
    expect(JwtStrategy).toBeDefined();
  });

  describe('when class is instantiated', () => {
    let jwtStrategy: JwtStrategy;
    let usersService: UsersService;

    beforeEach(async () => {
      process.env.JWT_SECRET = 'secret';

      const test = await Test.createTestingModule({
        providers: [JwtStrategy, UsersService],
      }).compile();

      jwtStrategy = test.get<JwtStrategy>(JwtStrategy);
      usersService = test.get<UsersService>(UsersService);

      jest.clearAllMocks();
    });

    it('should be defined', () => {
      expect(jwtStrategy).toBeDefined();
    });

    describe('validate', () => {
      it('should call the usersService.getLogged() method', async () => {
        await jwtStrategy.validate({ id: userMock.id });

        expect(usersService.getLogged).toHaveBeenCalledTimes(1);
        expect(usersService.getLogged).toHaveBeenCalledWith(userMock.id);
      });

      it('should return the user', async () => {
        const user = await jwtStrategy.validate({ id: userMock.id });

        expect(user).toBeDefined();
        expect(user.id).toEqual(userMock.id);
      });
    });
  });
});
