import { DEBUG, getCommand, remove, showFiglet } from '../utils/index.js'
import { LocksPath } from './detect.js';
import * as execa from 'execa';
import chalk from 'chalk';
import fs from 'fs';

const startMap = ['serve', 'dev', 'start']
export default async (options) => {
    let debug = options.includes(DEBUG)
    let command;
    if (debug)
        remove(options, DEBUG)
    // 默认是run start
    if (options == undefined || options.length == 0) {
        let scripts = JSON.parse(fs.readFileSync(LocksPath)).scripts
        for (let start of startMap) {
            if (start in scripts) {
                options = [start]
            }
        }
    }
    if (options.length == 0) {
        console.log(chalk.red('Your command is invalid.Or you dont have run-start command in your package.json'));
        process.exit(1);
    }
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