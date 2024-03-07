import { signal } from '@angular/core';

export class AuthService {
  public readonly isLogged = signal(null);
  public readonly token = signal(null);

  public login = jest.fn();

  public rehydrate = jest.fn();

  public logout = jest.fn();
}
