import { GameModel, UserModel } from '@sleep-valley/backend/database';
import { GameCreatedEvent } from '@sleep-valley/backend/events';
import { GameStatus } from '@sleep-valley/core/enums';
import { User } from '@sleep-valley/core/interfaces';
import { GameEntity } from './game.entity';

const game: Partial<GameModel> = {
  id: '123',
  name: 'John Doe',
  ownerID: '999',
  createdAt: new Date(),
  deletedAt: null,
  updatedAt: new Date(),
  code: '123',
  status: GameStatus.PREPARING,
  Users: [],
  UserRequests: [],
  Owner: {
    id: '999',
  } as UserModel,
};

const gameModel = {
  ...game,
  toJSON: jest.fn().mockReturnValue(game),
} as Partial<GameEntity>;

describe('Game', () => {
  let game: GameEntity;

  beforeEach(() => {
    game = new GameEntity({ ...gameModel }, { ...game });
  });

  describe('create', () => {
    it('should call apply with a GameCreatedEvent', () => {
      const applySpy = jest.spyOn(game, 'apply');

      const userLogged = { id: '123' } as User;

      game.create('123', userLogged);

      expect(applySpy).toHaveBeenCalledWith(new GameCreatedEvent('123'));
    });
  });
});
