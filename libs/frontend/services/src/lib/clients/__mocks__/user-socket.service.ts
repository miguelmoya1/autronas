export class UserSocketService {
  public readonly init = jest.fn();

  public readonly usersUpdated = {
    subscribe: jest.fn(),
  };
}
