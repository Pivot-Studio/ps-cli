const spawn = require('cross-spawn');
const chalk = require('chalk')

module.exports = async (package, options) => {
    //package ：name ；options：参数选项
    let child;
    // 监听执行结果

    if (!package) {
        child = spawn('npm', ['i'], {
            stdio: 'inherit'
        });
        return
    } else {
        // 下载具体的包
        let op = '-D'
        if (options.dev) op = '-D'
        if (options.save) op = '-S'
        if (options.global) op = '-g'
        child = spawn('npm', ['install', op, package], {
            stdio: 'inherit'
        });
    }
    child.on('close', function (code) {
        // 执行失败
        if (code !== 0) {
            console.log(chalk.red('Error occurred while installing dependencies!'));
            process.exit(1);
        }
        // 执行成功 0
        else {
            console.log(chalk.cyan('Install finished'))
        }

    })
}