import { DEBUG, getCommand, remove, showFiglet } from '../utils';
import * as execa from 'execa';
import chalk from 'chalk';
export default async (options) => {
  let debug = options.includes(DEBUG);
  let isView = options.includes('-v');
  let command;
  if (debug) remove(options, DEBUG);
  if (isView) {
    remove(options, '-v');
    command = getCommand('view', options);
  } else command = getCommand('list', options);

  if (debug) {
    console.log(command);
    return;
  }
  try {
    await execa.execaCommand(command, {
      stdio: 'inherit',
      encoding: 'utf-8',
      cwd: process.cwd(),
    });
    showFiglet('Pivot Studio!!', 'list packages finished');
  } catch (error) {
    console.log(chalk.red('Error occurred while listing'));
    process.exit(1);
  }
};
