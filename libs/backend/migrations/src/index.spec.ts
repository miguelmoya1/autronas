import { readdir } from 'fs/promises';
import { migrations } from '.';
import path = require('path');

describe('migrations', () => {
  it('the array export should have the same length as the number of migrations', async () => {
    const migrationsFolder = './lib/';

    const files = await readdir(path.join(__dirname, migrationsFolder));

    expect(migrations.length).toEqual(files.length);
  });
});
