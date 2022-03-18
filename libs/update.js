const spawn = require('cross-spawn');
const chalk = require('chalk')
const figlet = require('figlet');
const {
    packageManage,
    Commands
} = require('./detect.js')

module.exports = async (package, options) => {
    //package ：name ；options：参数选项
    let child;
    if (!package) {
        let op = ''
        if (options.global) op = '-g'
        child = spawn(packageManage, [Commands.upgrade, op], {
            stdio: 'inherit'
        });
    } else {
        child = spawn(packageManage, [Commands.upgrade, package], {
            stdio: 'inherit'
        });
    }
    child.on('close', function (code) {
        // 执行失败
        if (code !== 0) {
            console.log(chalk.red('Error occurred while update packages!'));
            process.exit(1);
        }
        // 执行成功 0
        else {
            figlet('Pivot Studio!!', function (err, data) {
                if (err) {
                    console.dir(err);
                    return;
                }
                console.log(chalk.green(data))
                console.log(chalk.cyan('Update finished!!'))
            });
        }

    })
}