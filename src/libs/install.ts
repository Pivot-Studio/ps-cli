import { DEBUG, getCommand, remove, showFiglet,execCommand } from '../utils/index';
import chalk from 'chalk';

export default async (options) => {
  let debug = options.includes(DEBUG);
  let isFrozen = options.includes('--frozen');
  let isGlobal = options.includes('-g');
  let command;
  if (debug) remove(options, DEBUG);
  if (isFrozen) {
    remove(options, '--frozen');
    command = await getCommand('frozen', options);
  } else if (isGlobal) {
    // If i want to install a package in golbal,i must use 'global' instead of '-g' with yarn
    remove(options, '-g');
    command = await getCommand('global', options);
  } else if (options.length > 0) {
    // The difference between downloading allpackages and a single package is described
    // in the yarn command
    command = await getCommand('add', options);
  } else command = await getCommand('install', options);
  if (debug) {
    console.log(command);
    return;
  }
  try {
    await execCommand(command);
    showFiglet('Pivot Studio!!', 'install finished');
  } catch (error) {
    console.log(chalk.red('Error occurred while installing dependencies!'));
    process.exit(1);
  }
};
