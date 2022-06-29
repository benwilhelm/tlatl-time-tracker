import { exec } from 'child_process';

const promiseExec = (cmd) =>
  new Promise((resolve, reject) => {
    exec(cmd, (err, stdout) => {
      if (err) reject(err);
      else resolve(stdout);
    });
  });

const runCommand = async (cmd, args = []) => {
  const fullCommand = `node ./index.js ${cmd} ${args.join(' ')}`;
  return promiseExec(fullCommand);
};

const rslt = await runCommand('start');
console.log(rslt);
