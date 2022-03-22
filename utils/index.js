import {
    Commands
} from '../libs/detect.js'
import figlet from 'figlet'

export const DEBUG = '?'

export function getCommand(command, args) {
    const c = Commands[command]
    return c.replace('{0}', args.join(' ')).trim()
}

export function remove(arr, flag) {
    let index = arr.indexOf(flag)
    if (index > -1) {
        arr.splice(index, 1)
    }
}

export function showFiglet(logo, finishText) {
    figlet(logo, function (err, data) {
        if (err) {
            console.dir(err);
            return;
        }
        console.log(chalk.green(data))
        console.log(chalk.cyan(finishText))
    });
}