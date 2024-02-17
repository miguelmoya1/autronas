import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { CharacterModel } from '@sleep-valley/backend/database';
import { CharacterService } from './character.service';

describe('CharacterService', () => {
  let service: CharacterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharacterService,
        {
          provide: getModelToken(CharacterModel),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<CharacterService>(CharacterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
