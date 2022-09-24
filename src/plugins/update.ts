import { getCommand, remove, showFiglet, execCommand } from '../utils/index';
import chalk from 'chalk';
import { DEBUG } from '../constant';

export default async (options) => {
  let debug = options.includes(DEBUG);
  let isInteractive = options.includes('-i');
  let isGlobal = options.includes('-g');
  let command;
  if (debug) remove(options, DEBUG);
  if (isInteractive) {
    remove(options, '-i');
    command = await getCommand('upgrade-interactive', options);
  } else if (isGlobal) {
    remove(options, '-g');
    command = await getCommand('upgrade-global', options);
  } else command = await getCommand('upgrade', options);
  if (debug) {
    console.log(command);
    return;
  }
  try {
    await execCommand(command);
    showFiglet('Pivot Studio!!', 'upgrade finished');
  } catch (error) {
    console.log(chalk.red('Error occurred while upgrading dependencies!'));
    process.exit(1);
  }
};
