
import { DEBUG, getCommand, remove, showFiglet } from '../utils/index.js'
import * as execa from 'execa';

export default async (options) => {
    let debug = options.includes(DEBUG)
    if (debug)
        remove(options, DEBUG)

    let command = getCommand('execute', options)
    if (debug) {
        console.log(command);
        return
    };
    try {
        await execa.execaCommand(command, { stdio: 'inherit', encoding: 'utf-8', cwd: process.cwd() })
        showFiglet('Pivot Studio!!', 'execute finished')
    } catch (error) {
        console.log(chalk.red('Error occurred while executing dependencies!'));
        process.exit(1);
    }

}