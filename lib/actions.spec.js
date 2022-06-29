import { startTimerAction, stopTimerAction } from './actions.js';
import { createCollection } from './persistence.js';
import { config } from './config.js';

const dataDir = config.get('DATA_DIR');

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

describe('stopTimerAction', () => {
  it('should input an end time to a previously started session', async () => {
    // arrange
    const startTime = 100000000;
    const collectionName = 'sessions';
    const collection = await createCollection(collectionName, dataDir);
    const endTime = startTime + 1000;
    await startTimerAction(startTime);

    // act
    await stopTimerAction(endTime);

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
