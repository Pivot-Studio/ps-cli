import { getCommand, remove, showFiglet, execCommand } from '../utils/index';
import chalk from 'chalk';
import { DEBUG } from '../constant';

export default async (options) => {
  let debug = options.includes(DEBUG);
  let isGlobal = options.includes('-g');
  let command;

  if (debug) remove(options, DEBUG);

  if (isGlobal) {
    // If i want to install a package in golbal,i must use 'global' instead of '-g' with yarn
    remove(options, '-g');
    command = await getCommand('uninstall_global', options);
  } else command = await getCommand('uninstall', options);

  if (debug) {
    console.log(command);
    return;
  }

  try {
    await execCommand(command);
    showFiglet('Pivot Studio!!', 'uninstall finished');
  } catch (error) {
    console.log(chalk.red('Error occurred while uninstalling dependencies!'));
    process.exit(1);
  }
};
