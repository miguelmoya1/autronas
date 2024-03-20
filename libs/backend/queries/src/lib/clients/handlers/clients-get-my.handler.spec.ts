import { UserEntity } from '@autronas/backend/entities';
import { ClientsService } from '@autronas/backend/services';
import { Test, TestingModule } from '@nestjs/testing';
import { ClientsGetMyQuery } from '../impl';
import { ClientsGetMyHandler } from './clients-get-my.handler';

jest.mock('@autronas/backend/services');

describe('ClientsGetMyHandler', () => {
  let clientGetAllHandler: ClientsGetMyHandler;
  let clientsService: ClientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientsGetMyHandler, ClientsService],
    }).compile();

    clientGetAllHandler = module.get<ClientsGetMyHandler>(ClientsGetMyHandler);
    clientsService = module.get(ClientsService);
  });

  it('should be defined', () => {
    expect(clientGetAllHandler).toBeDefined();
  });

  describe('execute', () => {
    it('should call the clientService.get function', async () => {
      const userLogged = { id: '1' } as UserEntity;
      const paginator = { offset: 1, limit: 10 };
      const query = new ClientsGetMyQuery(paginator, userLogged);

      await clientGetAllHandler.execute(query);

      expect(clientsService.getMy).toHaveBeenCalledWith(paginator, userLogged);
    });
  });
});
