import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService, UsersService } from '@sleep-valley/backend/services';
import { GoogleLogin } from '@sleep-valley/core/interfaces';
import { LoginGoogleCommand } from '../impl/login-google.command';
import { LoginGoogleHandler } from './login-google.handler';

jest.mock('@sleep-valley/backend/services');

describe('LoginGoogleHandler', () => {
  let userCreateForGameHandler: LoginGoogleHandler;
  let authService: jest.Mocked<AuthService>;
  const command = new LoginGoogleCommand({
    id: 'id',
    idToken: 'idToken',
  } as GoogleLogin);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [LoginGoogleHandler, AuthService, UsersService],
    }).compile();

    userCreateForGameHandler = module.get<LoginGoogleHandler>(LoginGoogleHandler);
    authService = module.get(AuthService);

    jest.clearAllMocks();

    process.env['NODE_ENV'] = 'production';
  });

  afterAll(() => {
    process.env['NODE_ENV'] = 'test';
  });

  it('should be defined', () => {
    expect(userCreateForGameHandler).toBeDefined();
  });

  it('should call authService.verifyGoogleToken with the idToken', async () => {
    await userCreateForGameHandler.execute(command);

    expect(authService.verifyGoogleToken).toHaveBeenCalledTimes(1);
    expect(authService.verifyGoogleToken).toHaveBeenCalledWith('idToken');
  });

  it('should not call authService.verifyGoogleToken if the environment is not production', async () => {
    process.env['NODE_ENV'] = 'test';

    await userCreateForGameHandler.execute(command);

    expect(authService.verifyGoogleToken).not.toHaveBeenCalled();
  });

  it('should call authService.verifyGoogleToken if the environment is production', async () => {
    process.env['NODE_ENV'] = 'production';

    await userCreateForGameHandler.execute(command);

    expect(authService.verifyGoogleToken).toHaveBeenCalledTimes(1);
    expect(authService.verifyGoogleToken).toHaveBeenCalledWith('idToken');
  });
});
