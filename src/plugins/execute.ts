import chalk from 'chalk';

import {
  DEBUG,
  getCommand,
  remove,
  showFiglet,
  execCommand,
} from '../utils/index';

export default async (options) => {
  let debug = options.includes(DEBUG);
  if (debug) remove(options, DEBUG);

  let command = await getCommand('execute', options);
  if (debug) {
    console.log(command);
    return;
  }
  try {
    await execCommand(command);
    showFiglet('Pivot Studio!!', 'execute finished');
  } catch (error) {
    console.log(chalk.red('Error occurred while executing dependencies!'));
    process.exit(1);
  }
};
