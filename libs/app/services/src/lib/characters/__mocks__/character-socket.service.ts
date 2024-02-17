export class CharacterSocketService {
  public readonly init = jest.fn();

  public readonly charactersUpdated = {
    subscribe: jest.fn(),
  };
}
