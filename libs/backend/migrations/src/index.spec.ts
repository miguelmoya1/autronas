import { readdir } from 'fs/promises';
import { migrations } from '.';
import path = require('path');

describe('migrations', () => {
  it('the array export should have the same length as the number of migrations', async () => {
    const migrationsFolder = './lib/';

    const files = await readdir(path.join(__dirname, migrationsFolder));

    const migrationsInFolder = files.filter((file) => file.endsWith('.ts'));

    expect(migrations.length).toEqual(migrationsInFolder.length);
  });
});
