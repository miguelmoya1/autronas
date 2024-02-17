import { readdir } from 'fs/promises';
import { CharacterEventHandlers } from '.';

describe('CharacterEventHandlers', () => {
  it('should be defined', () => {
    expect(CharacterEventHandlers).toBeDefined();
  });

  it('should be an Array', () => {
    expect(CharacterEventHandlers).toBeInstanceOf(Array);
  });

  it('should have the same length as the number of handlers in the same folder (only .handler.ts)', async () => {
    const files = readdir(__dirname);

    const filesCount = (await files).filter((file) => file.endsWith('.handler.ts')).length;

    expect(CharacterEventHandlers).toHaveLength(filesCount);
  });
});
