import { readdir } from 'fs/promises';
import { VoteEventHandlers } from '.';

describe('VoteEventHandlers', () => {
  it('should be defined', () => {
    expect(VoteEventHandlers).toBeDefined();
  });

  it('should be an Array', () => {
    expect(VoteEventHandlers).toBeInstanceOf(Array);
  });

  it('should have the same length as the number of handlers in the same folder (only .handler.ts)', async () => {
    const files = readdir(__dirname);

    const filesCount = (await files).filter((file) => file.endsWith('.handler.ts')).length;

    expect(VoteEventHandlers).toHaveLength(filesCount);
  });
});
