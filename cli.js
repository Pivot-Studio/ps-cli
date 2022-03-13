#! /usr/bin/env node

// #! 符号的名称叫 Shebang，用于指定脚本的解释程序
// Node CLI 应用入口文件必须要有这样的文件头
// 如果是Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755
// 具体就是通过 chmod 755 cli.js 实现修改

const inquirer = require("inquirer")
const path = require('path')
const fs = require('fs')
const ejs = require('ejs')
const chalk = require('chalk')
const ora = require('ora')


inquirer.prompt([{
    type: 'input',
    name: 'componentName',
    message: `Key in your ${chalk.bgBlue.bold('Component name')}`,
    default: 'ps-component'
}]).then(ans => {
    const destUrl = process.cwd()
    const sourceUrl = path.resolve(__dirname, 'templates')
    // process.cwd() 对应当前目录的路径
    fs.readdir(sourceUrl, (err, data) => {
        if (err) throw err
        // data: ['component-templates.vue']
        for (let file of data) {
            const message = 'Creating files~'
            // 初始化
            const spinner = ora(message);
            // 开始加载动画
            spinner.start();
            ejs.renderFile(path.join(sourceUrl, file), ans).then(res => {
                const suffix = file.split('.')[1]
                fs.writeFileSync(path.join(destUrl, ans.componentName + '.' + suffix), res)
                spinner.stop()
                spinner.succeed(chalk.green('succeed')); // 成功 ✔
            })
        }
    })
})