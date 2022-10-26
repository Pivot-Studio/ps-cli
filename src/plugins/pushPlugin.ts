import github from '@/utils/git/github';
import inquirer from 'inquirer';
import { getGitConfig, gitPush, getCurrentBranch } from '@/utils/git/git';
import logger from '@/utils/logger';
import { execCommandAsync } from '@/utils';
import { URL_START } from '@/constant';
import { Argv } from 'yargs';
export default class PushPlugin {
  promptOption: any;
  constructor() {
    this._templateOptions();
  }
  getOptions(yargs: Argv): Argv {
    return yargs.alias('h', 'help');
  }
  async handler() {
    logger.start('开始push......');
    const { commit_msg } = await this._templatePrompt('push');
    await gitPush(commit_msg);
    const { isMr } = await this._templatePrompt('mr');
    if (isMr) {
      // todo: 获取仓库名，发起mr
      const { value } = await getGitConfig('remote.origin.url');
      const { current, all } = await getCurrentBranch(['-v']);
      const repoNameFitler = /\/([\w\d_-]*)\.git$/;
      const m = repoNameFitler.exec(value);
      const userInfo = await github.getAuth();
      const { base } = await this._templatePrompt(
        'chooseBase',
        all
          .filter((b) => b !== current)
          .map((branch) => ({
            name: branch,
            value: branch,
          }))
      );
      if (!m[1]) {
        throw new Error(
          '仓库名称解析失败。请确保你的仓库名称只有字母、数字以及中、下划线！'
        );
      }
      const mrOptions = {
        owner: userInfo.login,
        repo: m[1],
        head: current,
        base,
        title: commit_msg,
      };
      const { data } = await github.createMergeRequest(mrOptions);
      logger.complete('Merge Request创建完成～');
      logger.blue(
        `你修改了${data.changed_files}个文件，一共有${data.commits}次commits记录～`
      );
      execCommandAsync(`${URL_START} ${data.html_url}`);
    }
  }
  private _templateOptions() {
    this.promptOption = {
      push: [
        {
          type: 'input',
          name: 'commit_msg',
          message: '请输入你的提交描述：',
          validate: (input: string) => {
            if (!input) {
              return '请输入一个合法的commit信息！';
            }
            if (
              !/^\[?(feat|chore|refactor|docs|fix|style|revert|test|perf)\]?/.test(
                input
              )
            ) {
              return '请输入一个commit类型，比如以 feat|chore|refactor|docs|fix|style|revert|test|perf 开头～';
            }
            return true;
          },
        },
      ],
      mr: [
        {
          type: 'confirm',
          name: 'isMr',
          message: '是否要发起Merge Request？',
        },
      ],
      chooseBase: (choices: any[]) => [
        {
          type: 'rawlist',
          name: 'base',
          message: '请选择你要合并入的分支名：',
          choices,
        },
      ],
    };
  }
  private async _templatePrompt(key: string, choices?: any[]) {
    let option = this.promptOption[key];
    if (typeof option === 'function') {
      option = option(choices);
    }
    return await inquirer.prompt(option);
  }
}
