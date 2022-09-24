import detect from '../plugins/detect';
import figlet from 'figlet';
import chalk from 'chalk';
import { spawn, exec } from 'child_process';

export function execCommand(command: string, cwd?: string): Promise<string> {
  return new Promise(() => {
    const commands = command.split(' ');
    spawn(commands[0], commands.slice(1), {
      stdio: 'inherit',
      shell: process.platform === 'win32',
      cwd,
    });
  });
}

export function execCommandAsync(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, function (error, stdout) {
      if (error) {
        return reject(error);
      }
      resolve(stdout);
    });
  });
}
export async function getCommand(command, args) {
  const { Commands } = await detect();
  const c = Commands[command];
  if (typeof c == 'object')
    throw new Error(
      'The command is not existing for package manager you using!!'
    );
  if (typeof c == 'function') {
    return c(args);
  } else return c.replace('{0}', args.join(' ')).trim();
}

export function remove(arr, flag) {
  let index = arr.indexOf(flag);
  if (index > -1) {
    arr.splice(index, 1);
  }
}

export function spliceArr<T>(arr: Array<T>, flag: T) {
  let index = arr.indexOf(flag);
  const res = arr.concat();
  if (index > -1) {
    return res.filter((_, i) => i !== index);
  }

  return res;
}

export function showFiglet(logo, finishText) {
  figlet(logo, function (err, data) {
    if (err) {
      console.dir(err);
      return;
    }
    console.log(chalk.green(data));
    console.log(chalk.cyan(finishText));
  });
}
