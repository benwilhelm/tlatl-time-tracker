import yargs from 'yargs';
import { helloWorld } from './lib.js';

const argv = yargs(process.argv.slice(2))
  .scriptName('time-tracker')
  .usage('$0 <cmd> [args]')
  .command(
    'hello [name] [args]',
    'Greet a person by name, defaults to the whole world',
    (yargs) => {
      yargs.positional('name', {
        type: 'string',
        default: 'world',
      });
      yargs.option('emphasis', {
        alias: 'e',
        describe: 'how much emphasis, 1-5',
      });
    },
    (argv) => {
      const exStr = '!'.repeat(+argv.emphasis);
      const name = `${argv.name}${exStr}`;
      console.log(helloWorld(name));
    }
  )
  .command(
    'goodbye',
    'A friendly farewell',
    () => {},
    (argv) => {
      console.log("g'bye");
    }
  )
  .help().argv;
