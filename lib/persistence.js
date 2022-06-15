import { join } from 'path';
import { readFile, writeFile, stat } from 'fs/promises';

export async function createCollection(name, dataDir) {
  const collectionPath = join(dataDir, `${name}.json`);

  try {
    const statted = await stat(collectionPath);
  } catch (err) {
    await writeFile(collectionPath, '{}', 'utf-8');
  }

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
