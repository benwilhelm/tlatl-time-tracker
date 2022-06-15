import { startTimer } from './domain.js';
import { createCollection } from './persistence.js';

export async function startTimerAction(startTime = Date.now()) {
  const dataDir = process.env.DATA_DIR || './data';
  const collectionName = 'sessions';

  const collection = await createCollection(collectionName, dataDir);
  const sessions = await collection.readAll();

  const updatedSessions = startTimer(sessions, startTime);
  await collection.writeAll(updatedSessions);
}
