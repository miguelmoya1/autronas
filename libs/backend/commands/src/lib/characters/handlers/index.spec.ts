import { readdir } from 'fs/promises';
import { CharacterCommandHandlers } from '.';

describe('CharacterCommandHandlers', () => {
  it('should be defined', () => {
    expect(CharacterCommandHandlers).toBeDefined();
  });

  it('should be an Array', () => {
    expect(CharacterCommandHandlers).toBeInstanceOf(Array);
  });

  it('should have the same length as the number of handlers in the same folder (only .handler.ts)', async () => {
    const files = readdir(__dirname);

    const filesCount = (await files).filter((file) => file.endsWith('.handler.ts')).length;

    expect(CharacterCommandHandlers).toHaveLength(filesCount);
  });
});
