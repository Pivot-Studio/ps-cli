import { Commands } from '../libs/detect';
import figlet from 'figlet';
import chalk from 'chalk';

export const DEBUG = '?';

export function getCommand(command, args) {
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
