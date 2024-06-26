import { readdir } from 'fs/promises';
import { ClientQueryHandlers } from './index';

describe('ClientQueryHandlers', () => {
  it('should be defined', () => {
    expect(ClientQueryHandlers).toBeDefined();
  });

  it('should be an Array', () => {
    expect(ClientQueryHandlers).toBeInstanceOf(Array);
  });

  it('should have the same length as the number of handlers in the same folder (only .handler.ts)', async () => {
    const files = readdir(__dirname);

    const filesCount = (await files).filter((file) => file.endsWith('.handler.ts')).length;

    expect(ClientQueryHandlers).toHaveLength(filesCount);
  });
});
