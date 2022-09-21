import path from 'path';

import install from './npm/installPlugin';
import Dirname from 'es-dirname';
import inquirer from 'inquirer';
import fs from 'fs';
import ejs from 'ejs';
import chalk from 'chalk';
import ora from 'ora';
import figlet from 'figlet';

// process.cwd() 对应当前目录的路径
const message = 'Creating files~';
const ComponentMap = {
  Vue: '../templates/vue-component',
  React: {
    Class: '../templates/react-component/react-class-component',
    Hook: '../templates/react-component/react-hook-component',
  },
};
const ProjectMap = {
  Vue: '../templates/vue2-ts-template',
  React: '../templates/react-hook-template',
};
// 初始化
const spinner = ora(message);

const icons = ['.ico', '.png', '.jpg', '.svg'];
const dirname = Dirname();

export function createComponent(component, type) {
  const sourceSuffix = type
    ? ComponentMap[component][type]
    : ComponentMap[component];
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'componentName',
        message: `Key in your ${chalk.bgBlue.bold('Component name')}`,
        default: 'ps-component',
      },
    ])
    .then((ans) => {
      const destUrl = process.cwd();
      const sourceUrl = path.resolve(dirname, sourceSuffix);
      // 开始加载动画
      spinner.start();
      fs.readdir(sourceUrl, (err, data) => {
        if (err) throw err;
        // data: ['component-templates.vue']
        for (let file of data) {
          ejs.renderFile(path.join(sourceUrl, file), ans).then((res) => {
            const suffix = file.split('.')[1];
            fs.writeFileSync(
              path.join(destUrl, ans.componentName + '.' + suffix),
              res
            );
          });
        }
        spinner.stop();
        console.log(figlet.textSync('Pivot Studio!!'));
        spinner.succeed(chalk.green('succeed')); // 成功 ✔
      });
    });
}
function traseverDir(source, dest, name, relative = '') {
  fs.readdir(source, (err, data) => {
    if (err) throw err;
    // data: ['component-templates.vue']
    for (let file of data) {
      const curUrl = path.join(source, file);
      fs.stat(curUrl, (err, stats) => {
        // // resolve 是从磁盘根目录开始
        // join 直接拼接
        if (stats.isDirectory()) {
          fs.mkdirSync(path.join(relative, file));
          traseverDir(
            curUrl,
            path.join(dest, file),
            name,
            path.join(relative, file)
          );
        } else {
          const suffix = path.extname(file);

          if (icons.includes(suffix)) {
            // 如果是图片
            fs.copyFileSync(curUrl, path.join(dest, file));
          } else {
            ejs.renderFile(curUrl, { projectName: name }).then((res) => {
              fs.writeFileSync(path.join(dest, file), res);
            });
          }
        }
      });
    }
  });
}
export async function createProject(frame, name) {
  const destUrl = process.cwd();
  const sourceSuffix = ProjectMap[frame];

  const sourceUrl = path.resolve(dirname, sourceSuffix);
  // process.cwd() 对应当前目录的路径
  const message = 'Creating Vue2 Project~';
  // 初始化
  const spinner = ora(message);
  // 开始加载动画
  spinner.start();
  // 遍历生成模板
  traseverDir(sourceUrl, destUrl, name);
  // 下载依赖
  install([]);
}
