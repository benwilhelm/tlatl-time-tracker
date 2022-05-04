import { helloWorld, startTimer, stopTimer } from './lib.js';

test('greets by name', () => {
  expect(helloWorld('ben')).toEqual('hello ben');
});
test('defaults name to world if unspecified', () => {
  expect(helloWorld()).toEqual('hello world');
});

describe('startTimer', () => {
  test('records new session with currentTime as start and empty stop', () => {
    // arrange
    const sessions = {};
    const startTime = Date.now();

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
