import { startTimerAction, endTimerAction } from './actions.js';
import { createCollection } from './persistence.js';

const dataDir = process.env.DATA_DIR || './data';

beforeEach(async () => {
  const collection = await createCollection('sessions', dataDir);
  await collection.writeAll({});
});

describe('startTimerAction', () => {
  test('starts session by writing to collection', async () => {
    // arrange
    const startTime = 100000000;
    const collectionName = 'sessions';
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

describe('endTimerAction', () => {
  it('should input an end time to a previously started session', async () => {
    // arrange
    const startTime = 100000000;
    const collectionName = 'sessions';
    const collection = await createCollection(collectionName, dataDir);
    const endTime = startTime + 1000;
    await startTimerAction(startTime);

    // act
    await endTimerAction(endTime);

    // assert
    const result = await collection.readAll();
    expect(result).toEqual({
      [startTime]: {
        start: startTime,
        end: endTime,
      },
    });
  });
});
