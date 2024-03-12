import { UserEntity } from '@autronas/backend/entities';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';

const SIGNED_JWT_RESULT = 'signed';

const jwtMock = {
  sign: jest.fn((token: string | object) => {
    if (token === 'throw') throw 'error';
    return SIGNED_JWT_RESULT;
  }),
  verify: jest.fn((token: string | object) => {
    if (token === 'throw') throw 'error';
    return token;
  }),
  decode: jest.fn((token: string | object) => {
    if (token === 'throw') throw 'error';
    return { id: SIGNED_JWT_RESULT };
  }),
};

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [AuthService, { provide: JwtService, useValue: jwtMock }],
    }).compile();

    service = module.get(AuthService);
    jwtService = module.get(JwtService);

    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('onModuleInit', () => {
    it('onModuleInit function', async () => {
      const onModuleInit = service.onModuleInit();
      expect(onModuleInit).toBeDefined();
    });

    it('Should be a function', () => {
      expect(service.onModuleInit).toHaveProperty('name', 'onModuleInit');
      expect(typeof service.onModuleInit).toBe('function');
      expect(service.onModuleInit).toBeInstanceOf(Function);
    });

    it('should set the private client', async () => {
      expect(service['client']).toBeDefined();
    });
  });

  describe('decode', () => {
    it('Should be a function', () => {
      expect(service.decode).toHaveProperty('name', 'decode');
      expect(typeof service.decode).toBe('function');
      expect(service.decode).toBeInstanceOf(Function);
    });

    it('should return the correct values', async () => {
      const user = new UserEntity({ id: '2c2b2f2e-2d2c-2b2a-2f2e-2d2c2b2a2f2e' }, {});
      const sign = service.sign(user);

      const decode = service.decode(sign);

      expect(decode).toBeDefined();
      expect(decode).toHaveProperty('id');
      expect(decode.id).toBe(SIGNED_JWT_RESULT);
    });

    it('should throw an error', async () => {
      expect(() => service.decode('throw')).toThrowError();
    });
  });

  describe('sign', () => {
    it('Should be a function', () => {
      expect(service.sign).toHaveProperty('name', 'sign');
      expect(typeof service.sign).toBe('function');
      expect(service.sign).toBeInstanceOf(Function);
    });

    it('should call the jwtService sign function with the correct values', async () => {
      const user = new UserEntity({ id: '2c2b2f2e-2d2c-2b2a-2f2e-2d2c2b2a2f2e' }, {});
      const sign = service.sign(user);

      expect(jwtService.sign).toHaveBeenCalled();
      expect(jwtService.sign).toHaveBeenCalledWith({ id: user.id });

      expect(sign).toBeDefined();
      expect(sign).toBe(SIGNED_JWT_RESULT);
    });
  });
});
