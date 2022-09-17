import { DEBUG, getCommand, remove, showFiglet } from '../utils';
import chalk from 'chalk';
import * as execa from 'execa';

export default async (options) => {
  let debug = options.includes(DEBUG);
  let isGlobal = options.includes('-g');
  let command;

  if (debug) remove(options, DEBUG);

  if (isGlobal) {
    // If i want to install a package in golbal,i must use 'global' instead of '-g' with yarn
    remove(options, '-g');
    command = getCommand('uninstall_global', options);
  } else command = getCommand('uninstall', options);

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
    showFiglet('Pivot Studio!!', 'uninstall finished');
  } catch (error) {
    console.log(chalk.red('Error occurred while uninstalling dependencies!'));
    process.exit(1);
  }
};
