import { UserEntity } from '@autronas/backend/entities';
import { ClientsService } from '@autronas/backend/services';
import { HttpException } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { ClientCreateCommand } from '../impl/client-create.command';
import { ClientCreateHandler } from './client-create.handler';

jest.mock('@autronas/backend/services');

describe('ClientCreateHandler', () => {
  let clientCreateHandler: ClientCreateHandler;
  let clientsService: ClientsService;

  const command = new ClientCreateCommand({ name: 'name' }, {} as UserEntity);
  const commandError = new ClientCreateCommand({ name: 'error' }, {} as UserEntity);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [ClientCreateHandler, ClientsService],
    }).compile();

    clientCreateHandler = module.get<ClientCreateHandler>(ClientCreateHandler);
    clientsService = module.get<ClientsService>(ClientsService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(clientCreateHandler).toBeDefined();
  });

  it('should create a client', async () => {
    await clientCreateHandler.execute(command);

    expect(clientsService.create).toHaveBeenCalled();
  });

  it('should throw an error when the client is not created', async () => {
    try {
      await clientCreateHandler.execute(commandError);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toBe('ERROR_CREATING_CLIENT');
      } else if (e instanceof HttpException) {
        expect(e.getStatus()).toBe(400);
        expect(e.getResponse()).toBe('ERROR_CREATING_CLIENT');
      } else {
        fail('Unexpected error type');
      }
    }
  });
});
