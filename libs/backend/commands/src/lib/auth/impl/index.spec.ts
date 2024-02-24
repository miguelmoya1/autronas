import { readdir } from 'fs/promises';
import * as commands from '.';

describe('GameCommands', () => {
  it('should be defined', () => {
    expect(commands).toBeDefined();
  });

  it('should export the correct number of items', async () => {
    const exportedItems = Object.keys(commands);

    const files = readdir(__dirname);

    const filesCount = (await files).filter((file) => file.endsWith('.command.ts')).length;

    expect(exportedItems).toHaveLength(filesCount);
  });
});
