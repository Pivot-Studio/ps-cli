#! /usr/bin / env node

// #! 符号的名称叫 Shebang，用于指定脚本的解释程序
// Node CLI 应用入口文件必须要有这样的文件头
// 如果是Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755
// 具体就是通过 chmod 755 cli.js 实现修改
const spawn = require('cross-spawn');

const inquirer = require("inquirer")
const path = require('path')
const fs = require('fs')
const ejs = require('ejs')
const chalk = require('chalk')
const ora = require('ora')
const figlet = require('figlet');
// process.cwd() 对应当前目录的路径
const message = 'Creating files~'
// 初始化
const spinner = ora(message);

const icons = ['.ico', '.png', '.jpg', '.svg']
async function createComponent() {
    inquirer.prompt([{
        type: 'input',
        name: 'componentName',
        message: `Key in your ${chalk.bgBlue.bold('Component name')}`,
        default: 'ps-component'
    }]).then(ans => {
        const destUrl = process.cwd()
        const sourceUrl = path.resolve(__dirname, '../templates/component-templates')

        // 开始加载动画
        spinner.start();
        fs.readdir(sourceUrl, (err, data) => {
            if (err) throw err
            // data: ['component-templates.vue']
            for (let file of data) {
                ejs.renderFile(path.join(sourceUrl, file), ans).then(res => {
                    const suffix = file.split('.')[1]
                    fs.writeFileSync(path.join(destUrl, ans.componentName + '.' + suffix), res)
                })
            }
            spinner.stop()
            console.log(figlet.textSync('Pivot Studio!!'));
            spinner.succeed(chalk.green('succeed')); // 成功 ✔
        })
    })
}
function traseverDir(source, dest, name, relative = '') {
    fs.readdir(source, (err, data) => {
        if (err) throw err
        // data: ['component-templates.vue']
        for (let file of data) {
            const curUrl = path.join(source, file)
            fs.stat(curUrl, (err, stats) => {
                // // resolve 是从磁盘根目录开始
                // join 直接拼接
                if (stats.isDirectory()) {
                    fs.mkdirSync(path.join(relative, file))
                    traseverDir(curUrl, path.join(dest, file), name, path.join(relative, file))
                } else {
                    const suffix = path.extname(file)

                    if (icons.includes(suffix)) {
                        // 如果是图片
                        fs.copyFileSync(curUrl, path.join(dest, file))
                    } else {
                        ejs.renderFile(curUrl, { 'projectName': name }).then(res => {
                            fs.writeFileSync(path.join(dest, file), res)
                        })
                    }

                }
            })
        }


    })
}
async function createProject(name) {
    const destUrl = process.cwd()
    const sourceUrl = path.resolve(__dirname, '../templates/vue2-ts-template')
    // process.cwd() 对应当前目录的路径
    const message = 'Creating Vue2 Project~'
    // 初始化
    const spinner = ora(message);
    // 开始加载动画
    spinner.start();
    // 遍历生成模板
    traseverDir(sourceUrl, destUrl, name)
    // 下载依赖
    // 这里以后再改吧！！！！！！！！！！！！！！！！
    let child = spawn('npm', ['install'], {
        stdio: 'inherit'
    });
    child.on('close', function (code) {
        // 执行失败
        if (code !== 0) {
            console.log(chalk.red('Error occurred while installing dependencies!'));
            process.exit(1);
        }
        // 执行成功 0
        else {
            spinner.stop()
            console.log(figlet.textSync('Pivot Studio!!'));
            spinner.succeed(chalk.green('succeed')); // 成功 ✔
        }
    })

}


module.exports = {
    createComponent,
    createProject
}