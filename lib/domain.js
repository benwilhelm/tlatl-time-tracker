export function startTimer(sessions, startTime = Date.now()) {
  if (Object.values(sessions).find((session) => !session.end)) {
    throw new Error('session already started');
  }

  const session = {
    start: startTime,
  };
  return { ...sessions, [startTime]: session };
}

export function stopTimer(sessions, stopTime = Date.now()) {
  const session = Object.values(sessions).find((session) => !session.end);
  if (!session) {
    throw new Error('No active session');
  }
  session.end = stopTime;

  return { ...sessions };
}

export function elapsed(sessions) {
  return Object.values(sessions).reduce((totalElapsed, session) => {
    if (!session.end) {
      session.end = Date.now();
    }
    return totalElapsed + (session.end - session.start);
  }, 0);
}

export function report() {}
