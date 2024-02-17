import { readdir } from 'fs/promises';
import { CharacterQueryHandlers } from '.';

describe('CharacterQueryHandlers', () => {
  it('should be defined', () => {
    expect(CharacterQueryHandlers).toBeDefined();
  });

  it('should be an Array', () => {
    expect(CharacterQueryHandlers).toBeInstanceOf(Array);
  });

  it('should have the same length as the number of handlers in the same folder (only .handler.ts)', async () => {
    const files = readdir(__dirname);

    const filesCount = (await files).filter((file) => file.endsWith('.handler.ts')).length;

    expect(CharacterQueryHandlers).toHaveLength(filesCount);
  });
});
