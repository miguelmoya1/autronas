import { UserEntity } from '@autronas/backend/entities';
import { AuthRehydrateQuery } from '@autronas/backend/queries';
import { CommandBusMock, QueryBusMock } from '@autronas/backend/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthController;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: CommandBus, useValue: CommandBusMock },
        { provide: QueryBus, useValue: QueryBusMock },
      ],
    }).compile();

    controller = module.get(AuthController);
    queryBus = module.get(QueryBus);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('rehydrate', () => {
    it('should be defined', () => {
      expect(controller.rehydrate).toBeDefined();
    });

    it('should call the execute method of the queryBus', async () => {
      const user = new UserEntity({ id: '1' }, { id: '1' });
      const command = new AuthRehydrateQuery(user);

      await controller.rehydrate(user);

      expect(queryBus.execute).toHaveBeenCalledWith(command);
      expect(queryBus.execute).toHaveBeenCalledTimes(1);
    });
  });

  describe('loginGoogle', () => {
    it('should be defined', () => {
      expect(controller.loginGoogle).toBeDefined();
    });
  });
});
