
import { DEBUG, getCommand, remove, showFiglet } from '../utils/index.js'
import chalk from 'chalk';
import * as execa from 'execa';

export default async (options) => {
    let debug = options.includes(DEBUG)
    let isFrozen = options.includes('--frozen')
    let isGlobal = options.includes('-g')
    let command;
    if (debug)
        remove(options, DEBUG)
    if (isFrozen) {
        remove(options, '--frozen')
        command = getCommand('frozen', options)
    }
    else if (isGlobal) {
        // If i want to install a package in golbal,i must use 'global' instead of '-g' with yarn 
        remove(options, '-g')
        command = getCommand('global', options)
    }
    else if (options.length > 0) {
        // The difference between downloading allpackages and a single package is described
        // in the yarn command  
        command = getCommand('add', options)
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