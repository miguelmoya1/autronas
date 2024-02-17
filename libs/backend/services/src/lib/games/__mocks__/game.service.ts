import { GameEntity } from '@sleep-valley/backend/entities';

export class GameService {
  readonly getAll = jest.fn().mockImplementation(async () => {
    return [];
  });

  readonly get = jest.fn().mockImplementation(async (id: GameEntity['id']) => {
    return new GameEntity({ id }, {});
  });

  readonly getByCode = jest.fn().mockImplementation(async (code: GameEntity['code']) => {
    return new GameEntity({ code }, {});
  });

  readonly getRequests = jest.fn().mockImplementation(async (id: GameEntity['id']) => {
    id;
    return [];
  });

  readonly create = jest.fn().mockImplementation(async (game: GameEntity) => {
    game;
  });

  readonly save = jest.fn().mockImplementation(async (game: GameEntity) => {
    game;
  });

  readonly isUniqueCode = jest.fn().mockImplementation(async (code: string) => {
    code;
    return true;
  });

  readonly requestJoin = jest.fn().mockImplementation(async (id: GameEntity['id'], userID: string) => {
    id;
    userID;
  });

  readonly join = jest.fn().mockImplementation(async (id: GameEntity['id'], userID: string) => {
    id;
    userID;
  });

  readonly isInGame = jest.fn().mockImplementation(async (id: GameEntity['id'], userID: string) => {
    id;
    userID;
    return true;
  });
}
