export class VotesService {
  create = jest.fn(() => Promise.resolve({}));
  getMultiple = jest.fn(() => Promise.resolve([]));
  getMy = jest.fn(() => Promise.resolve({}));
}
