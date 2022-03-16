#! /usr/bin/env node

const chalk = require('chalk')
const { Command } = require('commander');
const Program = new Command();

const createCallBack = require('./libs/create.js')
Program
    .command('i')
    .description('install your dependencies')
    .action(
        require('./libs/install.js')
    )


const Create = Program.command('create <name>')
Create
    .description('create a new project')
    .action(createCallBack)

// 处理用户输入，参数默认是process.argv
Program.parse()