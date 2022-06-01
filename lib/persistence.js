import { join } from 'path';
import { readFile, writeFile } from 'fs/promises';

export function createCollection(name, dataDir) {
  const collectionPath = join(dataDir, `${name}.json`);

  return {
    async readAll() {
      const data = await readFile(collectionPath, 'utf-8');
      return JSON.parse(data);
    },
    async writeAll(data) {
      await writeFile(collectionPath, JSON.stringify(data), 'utf-8');
    },
  };
}
