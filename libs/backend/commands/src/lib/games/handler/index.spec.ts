import { readdir } from 'fs/promises';
import { GameCommandHandlers } from '.';

describe('GameCommandHandlers', () => {
  it('should be defined', () => {
    expect(GameCommandHandlers).toBeDefined();
  });

  it('should be an Array', () => {
    expect(GameCommandHandlers).toBeInstanceOf(Array);
  });

  it('should have the same length as the number of handlers in the same folder (only .handler.ts)', async () => {
    const files = readdir(__dirname);

    const filesCount = (await files).filter((file) => file.endsWith('.handler.ts')).length;

    expect(GameCommandHandlers).toHaveLength(filesCount);
  });
});
