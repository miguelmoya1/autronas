import { Test, TestingModule } from '@nestjs/testing';
import { CharacterService } from '@sleep-valley/backend/services';
import { User } from '@sleep-valley/core/interfaces';
import { CharacterGetAllQuery } from '../impl/character-get-all.query';
import { CharacterGetAllHandler } from './character-get-all.handler';

describe('CharacterGetAllHandler', () => {
  let characterGetAllHandler: CharacterGetAllHandler;
  let characterService: CharacterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharacterGetAllHandler,
        {
          provide: CharacterService,
          useValue: {
            getAllInGame: jest.fn(),
          },
        },
      ],
    }).compile();

    characterGetAllHandler = module.get<CharacterGetAllHandler>(CharacterGetAllHandler);
    characterService = module.get<CharacterService>(CharacterService);
  });

  it('should be defined', () => {
    expect(characterGetAllHandler).toBeDefined();
  });

  describe('execute', () => {
    it('should call the characterService.get function', async () => {
      const user: User = {} as User;
      const query = new CharacterGetAllQuery('', user);

      await characterGetAllHandler.execute(query);

      expect(characterService.getAllInGame).toHaveBeenCalledWith('', user);
    });
  });
});
