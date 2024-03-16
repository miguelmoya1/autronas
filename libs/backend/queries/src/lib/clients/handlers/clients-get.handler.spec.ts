import { UserEntity } from '@autronas/backend/entities';
import { ClientsService } from '@autronas/backend/services';
import { Test, TestingModule } from '@nestjs/testing';
import { ClientsGetQuery } from '../impl';
import { ClientsGetHandler } from './clients-get.handler';

jest.mock('@autronas/backend/services');

describe('ClientsGetHandler', () => {
  let clientGetAllHandler: ClientsGetHandler;
  let clientsService: ClientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientsGetHandler, ClientsService],
    }).compile();

    clientGetAllHandler = module.get<ClientsGetHandler>(ClientsGetHandler);
    clientsService = module.get(ClientsService);
  });

  it('should be defined', () => {
    expect(clientGetAllHandler).toBeDefined();
  });

  describe('execute', () => {
    it('should call the clientService.get function', async () => {
      const userLogged = { id: '1' } as UserEntity;
      const clientID = '1';
      const query = new ClientsGetQuery(clientID, userLogged);

      await clientGetAllHandler.execute(query);

      expect(clientsService.get).toHaveBeenCalledWith(userLogged);
    });
  });
});
