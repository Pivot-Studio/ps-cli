import detect from '../libs/detect';
import figlet from 'figlet';
import chalk from 'chalk';
import process from 'child_process';
export const DEBUG = '?';

export function execCommand(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    process.exec(command, function (error, stdout, stderr) {
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
  if (index > -1) {
    return arr.filter((_, i) => i !== index);
  }
  return arr;
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
