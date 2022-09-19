import { DEBUG, getCommand, remove, showFiglet,execCommand } from '../utils/index';
import chalk from 'chalk';
export default async (options) => {
  let debug = options.includes(DEBUG);
  let isView = options.includes('-v');
  let command;
  if (debug) remove(options, DEBUG);
  if (isView) {
    remove(options, '-v');
    command = await getCommand('view', options);
  } else command = await getCommand('list', options);

  if (debug) {
    console.log(command);
    return;
  }
  try {
    await execCommand(command);
    showFiglet('Pivot Studio!!', 'list packages finished');
  } catch (error) {
    console.log(chalk.red('Error occurred while listing'));
    process.exit(1);
  }
};
