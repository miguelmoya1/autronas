import { ClientCreateDTO, ClientUpdateDTO } from '@autronas/backend/dto';
import { ClientEntity } from '@autronas/backend/entities';
import { clientMock } from '@autronas/backend/testing';

export class ClientsService {
  readonly getMy = jest.fn().mockImplementation(async (id: ClientEntity['id']) => {
    return new ClientEntity({ ...clientMock, id }, { ...clientMock, id });
  });

  readonly update = jest.fn().mockImplementation(async (client: ClientUpdateDTO, clientID: string) => {
    if (client.name === 'error' || clientID === 'error') {
      return null;
    }

    return client;
  });

  readonly create = jest.fn().mockImplementation(async (client: ClientCreateDTO) => {
    if (client.name === 'error') {
      return null;
    }

    return client;
  });
}
