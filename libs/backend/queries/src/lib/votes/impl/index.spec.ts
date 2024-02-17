import { readdir } from 'fs/promises';
import * as queries from '.';

describe('VoteQueries', () => {
  it('should be defined', () => {
    expect(queries).toBeDefined();
  });

  it('should export the correct number of items', async () => {
    const exportedItems = Object.keys(queries);

    const files = readdir(__dirname);

    const filesCount = (await files).filter((file) => file.endsWith('.query.ts')).length;

    expect(exportedItems).toHaveLength(filesCount);
  });
});
