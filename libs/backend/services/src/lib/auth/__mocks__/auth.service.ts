import { User } from '@sleep-valley/core/interfaces';

export class AuthService {
  public decode = jest.fn((token: string) => ({ id: token }));
  public verifyGoogleToken = jest.fn((token: string) => Promise.resolve(token));
  public sign = jest.fn((user: User) => user.id);
  public rehydrate = jest.fn().mockReturnValue('token');
}
