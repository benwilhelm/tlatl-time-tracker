import yargs from 'yargs';
import { startTimerAction, stopTimerAction } from './lib/actions.js';

const argv = yargs(process.argv.slice(2))
  .scriptName('time-tracker')
  .usage('$0 <cmd> [args]')
  .command(
    'start',
    'Start a new timer session',
    (yargs) => {},
    (argv) => {
      startTimerAction();
    }
  )
  .command(
    'stop',
    'Stops a running timer',
    () => {},
    (argv) => {
      stopTimerAction();
    }
  )
  .help().argv;
