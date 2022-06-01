import { elapsed, startTimer, stopTimer } from './domain.js';

const now = new Date('2022-05-18');

beforeAll(() => {
  jest.useFakeTimers();
});
beforeEach(() => {
  jest.setSystemTime(now);
});
afterAll(() => {
  jest.useRealTimers();
});

describe('startTimer', () => {
  test('records new session with currentTime as start and empty stop', () => {
    // arrange
    const sessions = {};
    const startTime = now;

    // act
    const updatedSessions = startTimer(sessions, startTime);

    // assert
    expect(updatedSessions[startTime]).toEqual({
      start: startTime,
    });
  });

  test('defaults to current time', () => {
    // arrange
    const sessions = {};

    // If this gets flakey, try setting up a mock timer
    const currentTime = Date.now();

    // act
    const updatedSessions = startTimer(sessions);

    // assert
    expect(updatedSessions[currentTime]).toEqual({
      start: currentTime,
    });
  });

  test('throws if called with an already started session', () => {
    // arrange
    const startTime = Date.now() - 1000;
    const sessions = {
      [startTime]: { start: startTime },
    };

    // act
    const fn = () => startTimer(sessions);

    // assert
    expect(fn).toThrowError(/already started/i);
  });
});

describe('stopTimer', () => {
  test('sets end time to started session', () => {
    const startTime = Date.now() - 1000;
    const stopTime = Date.now();
    const sessions = {
      [startTime]: {
        start: startTime,
      },
    };

    const updatedSessions = stopTimer(sessions, stopTime);

    expect(updatedSessions).toEqual({
      [startTime]: {
        start: startTime,
        end: stopTime,
      },
    });
  });

  test('defaults stopTime to current time', () => {
    const startTime = Date.now() - 1000;
    const stopTime = Date.now();
    const sessions = {
      [startTime]: {
        start: startTime,
      },
    };

    const updatedSessions = stopTimer(sessions);

    expect(updatedSessions).toEqual({
      [startTime]: {
        start: startTime,
        end: stopTime,
      },
    });
  });

  test('throws error if no started sessions', () => {
    const sessions = {};

    const fn = () => stopTimer(sessions);

    expect(fn).toThrowError(/no active session/i);
  });
});

describe('elapsed', () => {
  test('returns total time elapsed in all sessions', () => {
    const sessions = {
      [10000]: { start: 10000, end: 20000 }, // 10,000
      [50000]: { start: 50000, end: 55000 }, //  5,000
      [70000]: { start: 70000, end: 80000 }, // 10,000
    };

    expect(elapsed(sessions)).toEqual(25000);
  });

  test('includes currently running session', () => {
    jest.setSystemTime(90000);
    const sessions = {
      [10000]: { start: 10000, end: 20000 }, // 10,000
      [50000]: { start: 50000, end: 55000 }, //  5,000
      [70000]: { start: 70000 }, // implied end at 90,000, 20,000 elapsed
    };

    expect(elapsed(sessions)).toEqual(35000);
  });

  test('no sessions returns zero', () => {
    const sessions = {};
    expect(elapsed(sessions)).toEqual(0);
  });
});
