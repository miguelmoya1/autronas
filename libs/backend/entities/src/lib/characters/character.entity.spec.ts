import { CharacterModel, UserModel } from '@sleep-valley/backend/database';
import { CharacterEntity } from './character.entity';

const character: Partial<CharacterModel> = {
  id: '123',
  ownerID: '999',
  createdAt: new Date(),
  deletedAt: null,
  updatedAt: new Date(),
  Owner: {
    id: '999',
  } as UserModel,
};

const characterModel = {
  ...character,
  toJSON: jest.fn().mockReturnValue(character),
};

const owner = new CharacterEntity(characterModel, { id: '999' });

describe('character', () => {
  it('should create', () => {
    expect(owner).toBeTruthy();
  });
});
