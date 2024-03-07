import { UserEntity } from '@autronas/backend/entities';
import { ClientsService } from '@autronas/backend/services';
import { HttpException } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { ClientUpdateCommand } from '../impl/client-update.command';
import { ClientUpdateHandler } from './client-update.handler';

jest.mock('@autronas/backend/services');

describe('ClientUpdateHandler', () => {
  let clientUpdateHandler: ClientUpdateHandler;
  let clientsService: ClientsService;

  const command = new ClientUpdateCommand(
    { name: 'name' },
    '1234',
    {} as UserEntity,
  );
  const commandError = new ClientUpdateCommand(
    { name: 'error' },
    'error',
    {} as UserEntity,
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [ClientUpdateHandler, ClientsService],
    }).compile();

    clientUpdateHandler = module.get<ClientUpdateHandler>(ClientUpdateHandler);
    clientsService = module.get<ClientsService>(ClientsService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(clientUpdateHandler).toBeDefined();
  });

  it('should update a client', async () => {
    await clientUpdateHandler.execute(command);

    expect(clientsService.update).toHaveBeenCalled();
  });

  it('should throw an error when the client is not updated', async () => {
    try {
      await clientUpdateHandler.execute(commandError);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toBe('ERROR_UPDATING_CLIENT');
      } else if (e instanceof HttpException) {
        expect(e.getStatus()).toBe(400);
        expect(e.getResponse()).toBe('ERROR_UPDATING_CLIENT');
      } else {
        fail('Unexpected error type');
      }
    }
  });
});
