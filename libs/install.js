import { packageManage } from './detect.js'

import { DEBUG, getCommand, remove, showFiglet } from '../utils/index.js'
import * as execa from 'execa';

export default async (options) => {
    let debug = options.includes(DEBUG)
    let isFrozen = options.includes('--frozen')
    let command;
    if (debug)
        remove(options, DEBUG)
    if (isFrozen) {
        remove(options, '--frozen')
        command = getCommand('frozen', options)
    }
    else command = getCommand('install', options)
    if (debug) {
        console.log(command);
        return
    };
    try {
        await execa.execaCommand(command, { stdio: 'inherit', encoding: 'utf-8', cwd: process.cwd() })
        showFiglet('Pivot Studio!!', 'install finished')
    } catch (error) {
        console.log(chalk.red('Error occurred while installing dependencies!'));
        process.exit(1);
    }

}