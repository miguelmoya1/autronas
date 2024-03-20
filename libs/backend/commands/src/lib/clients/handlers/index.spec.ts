import { readdir } from 'fs/promises';
import { ClientsCommandHandlers } from '.';

describe('ClientsCommandHandlers', () => {
  it('should be defined', () => {
    expect(ClientsCommandHandlers).toBeDefined();
  });

  it('should be an Array', () => {
    expect(ClientsCommandHandlers).toBeInstanceOf(Array);
  });

  it('should have the same length as the number of handlers in the same folder (only .handler.ts)', async () => {
    const files = readdir(__dirname);

    const filesCount = (await files).filter((file) => file.endsWith('.handler.ts')).length;

    expect(ClientsCommandHandlers).toHaveLength(filesCount);
  });
});
