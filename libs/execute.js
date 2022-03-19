const spawn = require('cross-spawn');
const chalk = require('chalk')
const figlet = require('figlet');
const {
    packageManage,
    Commands
} = require('./detect.js')
let isNpm = packageManage == 'npm'
module.exports = async (args) => {
    let child;
    // 下载具体的包
    if (isNpm) {
        child = spawn(Commands.execute, args, {
            stdio: 'inherit'
        })
    } else {
        child = spawn(packageManage, [Commands.execute].concat(args), {
            stdio: 'inherit'
        })
    }
    child.on('close', function (code) {
        // 执行失败
        if (code !== 0) {
            console.log(chalk.red('Error occurred while execute your package!'));
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
                console.log(chalk.cyan('execution finished'))
            })
        }
    })
}