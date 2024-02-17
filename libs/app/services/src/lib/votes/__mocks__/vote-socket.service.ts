export class VoteSocketService {
  public readonly init = jest.fn();

  public readonly votesUpdated = {
    subscribe: jest.fn(),
  };
}
