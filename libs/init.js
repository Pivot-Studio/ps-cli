
import { DEBUG, getCommand, remove, showFiglet } from '../utils/index.js'
import * as execa from 'execa';

export default async (options) => {
    let debug = options.includes(DEBUG)
    let command;
    if (debug)
        remove(options, DEBUG)
    // console.log(options);
    command = getCommand('init', options)

    if (debug) {
        console.log(command);
        return
    };
    try {
        await execa.execaCommand(command, { stdio: 'inherit', encoding: 'utf-8', cwd: process.cwd() })
        showFiglet('Pivot Studio!!', 'init finished')
    } catch (error) {
        console.log(chalk.red('Error occurred while init your project'));
        process.exit(1);
    }

}