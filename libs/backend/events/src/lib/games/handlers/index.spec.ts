import { readdir } from 'fs/promises';
import { GameEventHandlers } from '.';

describe('GameEventHandlers', () => {
  it('should be defined', () => {
    expect(GameEventHandlers).toBeDefined();
  });

  it('should be an Array', () => {
    expect(GameEventHandlers).toBeInstanceOf(Array);
  });

  it('should have the same length as the number of handlers in the same folder (only .handler.ts)', async () => {
    const files = readdir(__dirname);

    const filesCount = (await files).filter((file) => file.endsWith('.handler.ts')).length;

    expect(GameEventHandlers).toHaveLength(filesCount);
  });
});
