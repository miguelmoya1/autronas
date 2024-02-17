import { readdir } from 'fs/promises';
import { VoteCommandHandlers } from '.';

describe('VoteCommandHandlers', () => {
  it('should be defined', () => {
    expect(VoteCommandHandlers).toBeDefined();
  });

  it('should be an Array', () => {
    expect(VoteCommandHandlers).toBeInstanceOf(Array);
  });

  it('should have the same length as the number of handlers in the same folder (only .handler.ts)', async () => {
    const files = readdir(__dirname);

    const filesCount = (await files).filter((file) => file.endsWith('.handler.ts')).length;

    expect(VoteCommandHandlers).toHaveLength(filesCount);
  });
});
