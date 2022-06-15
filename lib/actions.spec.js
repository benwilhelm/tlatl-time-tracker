import { startTimerAction } from './actions.js';
import { createCollection } from './persistence.js';

describe('startTimerAction', () => {
  test('starts session by writing to collection', async () => {
    // arrange
    const startTime = 100000000;
    const collectionName = 'sessions';
    const dataDir = process.env.DATA_DIR || './data';
    const collection = await createCollection(collectionName, dataDir);

    // act
    await startTimerAction(startTime);

    // assert
    const result = await collection.readAll();
    expect(result).toEqual({
      [startTime]: {
        start: startTime,
      },
    });
  });
});
