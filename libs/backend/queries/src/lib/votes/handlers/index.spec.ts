import { readdir } from 'fs/promises';
import { VoteQueryHandlers } from '.';

describe('VoteQueryHandlers', () => {
  it('should be defined', () => {
    expect(VoteQueryHandlers).toBeDefined();
  });

  it('should be an Array', () => {
    expect(VoteQueryHandlers).toBeInstanceOf(Array);
  });

  it('should have the same length as the number of handlers in the same folder (only .handler.ts)', async () => {
    const files = readdir(__dirname);

    const filesCount = (await files).filter((file) => file.endsWith('.handler.ts')).length;

    expect(VoteQueryHandlers).toHaveLength(filesCount);
  });
});
