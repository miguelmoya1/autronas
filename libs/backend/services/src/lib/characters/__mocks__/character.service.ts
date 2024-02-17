import { CharacterEntity, UserEntity } from '@sleep-valley/backend/entities';

export class CharacterService {
  readonly get = jest.fn().mockImplementation(async (id: CharacterEntity['id']) => {
    return new CharacterEntity({ id }, {});
  });

  readonly getMyInGame = jest.fn().mockImplementation(async (gameID: string, user: Partial<UserEntity>) => {
    return new CharacterEntity({ id: '1' }, user);
  });

  readonly getAllInGame = jest.fn().mockImplementation(async (gameID: string, user: Partial<UserEntity>) => {
    return [new CharacterEntity({ id: '1' }, user)];
  });

  readonly bulkCreate = jest.fn().mockImplementation(async (characters: CharacterEntity[]) => {
    characters;
  });

  readonly getAvailableCharacterTypesShuffled = jest.fn().mockImplementation(async (totalUsers: number) => {
    totalUsers;
    return [];
  });

  readonly save = jest.fn().mockImplementation(async (character: CharacterEntity) => {
    character;
  });
}
