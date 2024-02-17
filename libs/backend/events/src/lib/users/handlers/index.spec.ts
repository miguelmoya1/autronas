import { readdir } from 'fs/promises';
import { UserEventHandlers } from '.';

describe('UserEventHandlers', () => {
  it('should be defined', () => {
    expect(UserEventHandlers).toBeDefined();
  });

  it('should be an Array', () => {
    expect(UserEventHandlers).toBeInstanceOf(Array);
  });

  it('should have the same length as the number of handlers in the same folder (only .handler.ts)', async () => {
    const files = readdir(__dirname);

    const filesCount = (await files).filter((file) => file.endsWith('.handler.ts')).length;

    expect(UserEventHandlers).toHaveLength(filesCount);
  });
});
