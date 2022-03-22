import { packageManage } from './detect.js'

import { DEBUG, getCommand, remove, showFiglet } from '../utils/index.js'
import * as execa from 'execa';

export default async (options) => {
    let debug = options.includes(DEBUG)

    if (debug)
        remove(options, DEBUG)

    let command;
    // 这里需要判断是否删除全部
    if (options.length == 0) command = getCommand('uninstall_all', options)
    else command = getCommand('uninstall', options)


    if (debug) {
        console.log(command);
        return
    };

    try {
        await execa.execaCommand(command, { stdio: 'inherit', encoding: 'utf-8', cwd: process.cwd() })
        showFiglet('Pivot Studio!!', 'uninstall finished')
    } catch (error) {
        console.log(chalk.red('Error occurred while uninstalling dependencies!'));
        process.exit(1);
    }

}