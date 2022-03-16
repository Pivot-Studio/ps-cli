const spawn = require('cross-spawn');
const chalk = require('chalk')

module.exports = async () => {
    const child = spawn('npm', ['i'], {
        stdio: 'inherit'
    });
    // 监听执行结果
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