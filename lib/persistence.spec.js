import { createCollection } from './persistence';
import { mkdtemp, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';

describe('createCollection', () => {
  describe('readAll', () => {
    it('should read collection from provided directory/name', async () => {
      // arrange
      const collectionName = 'read-collection';
      const data = { foo: 'bar' };
      const { collection } = await tempCollectionFactory(collectionName, data);

      // act
      const rslt = await collection.readAll();

      // assert
      expect(rslt).toEqual(data);
    });
  });

  describe('writeAll', () => {
    it('should write data to collection file', async () => {
      const data = { bif: 'baz' };
      const collectionName = 'write-collection';
      const { collection, collectionPath, dataDir } =
        await tempCollectionFactory(collectionName);

      await collection.writeAll(data);

      const newCollection = createCollection(collectionName, dataDir);

      const writtenData = await newCollection.readAll();
      expect(JSON.parse(writtenData)).toEqual(data);
    });
  });
});

async function tempCollectionFactory(name, seedData) {
  const dataDir = await mkdtemp(join(tmpdir(), 'time-tracker-'));
  const collectionPath = join(dataDir, `${name}.json`);
  if (seedData) {
    await writeFile(collectionPath, JSON.stringify(seedData), 'utf-8');
  }
  const collection = createCollection(name, dataDir);

  return {
    dataDir,
    collectionPath,
    collection,
  };
}
