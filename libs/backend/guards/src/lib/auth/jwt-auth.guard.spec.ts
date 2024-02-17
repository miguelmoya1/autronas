import { Test } from '@nestjs/testing';
import { JwtAuthGuard } from './jwt-auth.guard';

describe('JwtAuthGuard', () => {
  let jwtAuthGuard: JwtAuthGuard;

  let user: { email: string; id: string };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [JwtAuthGuard],
    }).compile();

    jwtAuthGuard = module.get(JwtAuthGuard);

    user = { email: 'mail@mail.com', id: '123' };

    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(jwtAuthGuard).toBeDefined();
  });

  describe('canActivate', () => {
    it('Should be defined', () => {
      expect(jwtAuthGuard.canActivate).toBeDefined();
    });

    it('Should be a function', () => {
      expect(jwtAuthGuard.canActivate).toBeInstanceOf(Function);
    });
  });

  describe('handleRequest', () => {
    it('Should be defined', () => {
      expect(jwtAuthGuard.handleRequest).toBeDefined();
    });

    it('Should be a function', () => {
      expect(jwtAuthGuard.handleRequest).toBeInstanceOf(Function);
    });

    it('Should return an object', () => {
      expect(jwtAuthGuard.handleRequest(null, user)).toBeInstanceOf(Object);
    });

    it('Should return the same value as user', () => {
      expect(jwtAuthGuard.handleRequest(null, user)).toBe(user);
    });
  });
});
