import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { GameEntity } from '@sleep-valley/backend/entities';
import { CharacterService, GameService } from '@sleep-valley/backend/services';
import { CharacterCreateForGameCommand } from '../impl/characters-create-for-game.command';
import { CharacterCreateForGameHandler } from './character-create-from-games.handler';

jest.mock('@sleep-valley/backend/services');

describe('CharacterCreateForGameHandler', () => {
  let characterCreateForGameHandler: CharacterCreateForGameHandler;

  let gameService: jest.Mocked<GameService>;
  let characterService: jest.Mocked<CharacterService>;

  const command = new CharacterCreateForGameCommand('gameID');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [CharacterCreateForGameHandler, CharacterService, GameService],
    }).compile();

    characterCreateForGameHandler = module.get(CharacterCreateForGameHandler);
    gameService = module.get(GameService);
    characterService = module.get(CharacterService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(characterCreateForGameHandler).toBeDefined();
  });

  describe('execute', () => {
    const gameMocked = new GameEntity({ id: 'gameID', Users: [] }, {});

    it('should call charactersCreated from the game and commit after', async () => {
      jest.spyOn(gameMocked, 'charactersCreated');
      jest.spyOn(gameMocked, 'commit');
      jest.spyOn(gameService, 'get').mockResolvedValueOnce(gameMocked);

      await characterCreateForGameHandler.execute(command);

      expect(gameMocked.charactersCreated).toHaveBeenCalledTimes(1);

      expect(characterService.bulkCreate.mock.calls[0][0].length).toEqual(gameMocked.Users.length);

      expect(gameMocked.commit).toHaveBeenCalledTimes(1);
    });
  });
});
