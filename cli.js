#! /usr/bin/env node

const chalk = require('chalk')
const { Command } = require('commander');
const Program = new Command();

const createCallBack = require('./libs/create.js')
const Install = Program.command('i [package]')
Install
    .option('-d , --dev', 'install in DevDependency')
    .option('-s , --save', 'install in Dependency')
    .option('-g , --global', 'install in Global')
    .description('install your dependencies')
    .action(
        require('./libs/install.js')
    )

const Uninstall = Program.command('ui [package]')
Uninstall
    .option('-d , --dev', 'uninstall in DevDependency')
    .option('-s , --save', 'uninstall in Dependency')
    .option('-g , --global', 'uninstall in Global')
    .description('uninstall your dependencies')
    .action(
        require('./libs/uninstall.js')
    )


const Create = Program.command('create [name]', { isDefault: true })
Create
    .description('create a new project')
    .action(createCallBack)

// 处理用户输入，参数默认是process.argv
Program.parse()