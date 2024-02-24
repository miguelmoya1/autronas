import { readdir } from 'fs/promises';
import { AuthCommandHandlers } from '.';

describe('AuthCommandHandlers', () => {
  it('should be defined', () => {
    expect(AuthCommandHandlers).toBeDefined();
  });

  it('should be an Array', () => {
    expect(AuthCommandHandlers).toBeInstanceOf(Array);
  });

  it('should have the same length as the number of handlers in the same folder (only .handler.ts)', async () => {
    const files = readdir(__dirname);

    const filesCount = (await files).filter((file) => file.endsWith('.handler.ts')).length;

    expect(AuthCommandHandlers).toHaveLength(filesCount);
  });
});
