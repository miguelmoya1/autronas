import { readdir } from 'fs/promises';
import { AuthQueryHandlers } from '.';

describe('AuthQueryHandlers', () => {
  it('should be defined', () => {
    expect(AuthQueryHandlers).toBeDefined();
  });

  it('should be an Array', () => {
    expect(AuthQueryHandlers).toBeInstanceOf(Array);
  });

  it('should have the same length as the number of handlers in the same folder (only .handler.ts)', async () => {
    const files = readdir(__dirname);

    const filesCount = (await files).filter((file) => file.endsWith('.handler.ts')).length;

    expect(AuthQueryHandlers).toHaveLength(filesCount);
  });
});
