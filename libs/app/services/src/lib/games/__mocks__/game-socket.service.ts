export class GameSocketService {
  public readonly init = jest.fn();

  public readonly gamesUpdated = {
    subscribe: jest.fn(),
  };

  public readonly gameUpdated = {
    subscribe: jest.fn(),
  };
}
