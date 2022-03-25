import { DEBUG, getCommand, remove, showFiglet } from '../utils/index.js'
import * as execa from 'execa';
import chalk from 'chalk';
export default async (options) => {
    let debug = options.includes(DEBUG)
    let command;
    if (debug)
        remove(options, DEBUG)
    command = getCommand('run', options)

    if (debug) {
        console.log(command);
        return
    };
    try {
        await execa.execaCommand(command, { stdio: 'inherit', encoding: 'utf-8', cwd: process.cwd() })
        showFiglet('Pivot Studio!!', 'Your scripting ran')
    } catch (error) {
        console.log(chalk.red('Error occurred while runner your scripting'));
        process.exit(1);
    }

}