import { DEBUG, getCommand, remove, showFiglet,execCommand } from '../utils/index';
import chalk from 'chalk';

export default async (options) => {
  let debug = options.includes(DEBUG);
  let command;
  if (debug) remove(options, DEBUG);
  // console.log(options);
  command = await getCommand('init', options);

  if (debug) {
    console.log(command);
    return;
  }
  try {
    await execCommand(command);
    showFiglet('Pivot Studio!!', 'init finished');
  } catch (error) {
    console.log(chalk.red('Error occurred while init your project'));
    process.exit(1);
  }
};
