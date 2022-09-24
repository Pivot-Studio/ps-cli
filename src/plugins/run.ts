import { getCommand, remove, showFiglet, execCommand } from '../utils/index';
import detect from './detect';
import chalk from 'chalk';
import fs from 'fs';
import { DEBUG } from '../constant';

const startMap = ['serve', 'dev', 'start'];
export default async (options) => {
  let debug = options.includes(DEBUG);
  let command;
  if (debug) remove(options, DEBUG);
  const { locksPath } = await detect();
  // 默认是run start
  if (options == undefined || options.length == 0) {
    let { scripts } = JSON.parse(
      fs.readFileSync(locksPath, {
        encoding: 'utf-8',
      })
    );
    for (let start of startMap) {
      if (start in scripts) {
        // eslint-disable-next-line no-param-reassign
        options = [start];
      }
    }
  }
  if (options.length == 0) {
    console.log(
      chalk.red(
        'Your command is invalid.Or you dont have run-start command in your packageon'
      )
    );
    process.exit(1);
  }
  command = await getCommand('run', options);

  if (debug) {
    console.log(command);
    return;
  }
  try {
    await execCommand(command);
    showFiglet('Pivot Studio!!', 'Your scripting ran');
  } catch (error) {
    console.log(chalk.red('Error occurred while runner your scripting'));
    process.exit(1);
  }
};
