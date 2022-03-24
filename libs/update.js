
import { DEBUG, getCommand, remove, showFiglet } from '../utils/index.js'
import * as execa from 'execa';

export default async (options) => {
    let debug = options.includes(DEBUG)
    let isInteractive = options.includes('-i')
    let command;
    if (debug)
        remove(options, DEBUG)
    if (isInteractive) {
        remove(options, '-i')
        command = getCommand('upgrade-interactive', options)
    }
    else command = getCommand('upgrade', options)
    if (debug) {
        console.log(command);
        return
    };
    try {
        await execa.execaCommand(command, { stdio: 'inherit', encoding: 'utf-8', cwd: process.cwd() })
        showFiglet('Pivot Studio!!', 'upgrade finished')
    } catch (error) {
        console.log(chalk.red('Error occurred while upgrading dependencies!'));
        process.exit(1);
    }

}