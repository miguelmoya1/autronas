import { readdir } from 'fs/promises';
import { UserQueryHandlers } from '.';

describe('UserQueryHandlers', () => {
  it('should be defined', () => {
    expect(UserQueryHandlers).toBeDefined();
  });

  it('should be an Array', () => {
    expect(UserQueryHandlers).toBeInstanceOf(Array);
  });

  it('should have the same length as the number of handlers in the same folder (only .handler.ts)', async () => {
    const files = readdir(__dirname);

    const filesCount = (await files).filter((file) => file.endsWith('.handler.ts')).length;

    expect(UserQueryHandlers).toHaveLength(filesCount);
  });
});
