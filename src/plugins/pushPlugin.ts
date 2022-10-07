import github from '@/utils/git/github';
import inquirer from 'inquirer';
import { cwd } from 'process';
import { getGitConfig, gitPush } from '@/utils/git/git';
import logger from '@/utils/logger';
export default class PushPlugin {
  promptOption: any;
  constructor() {
    this._templateOptions();
  }
  getOptions() {
    return {};
  }
  async handler() {
    logger.start('开始push......');
    const { commit_msg } = await this._templatePrompt('push');
    const res = await gitPush(commit_msg);
    console.log(res);

    const { isMr } = await this._templatePrompt('mr');
    if(isMr){
      // todo: 获取仓库名，发起mr
      const url = await getGitConfig('url')
      const repoNameFitler = /\/([\w\d]*)\.git$/
      const userInfo = await github.getAuth()
      console.log(userInfo);
      
      const mrOptions = {
        owner: userInfo.login,
        repo: 
      }
      await github.createMergeRequest(mrOptions)
    }
  }
  private _templateOptions() {
    this.promptOption = {
      push: [
        {
          type: 'input',
          name: 'commit_msg',
          message: '请输入你的提交描述：',
        },
      ],
      mr: [
        {
          type: 'confirm',
          name: 'isMr',
          message: '是否要发起Merge Request？',
        },
      ],
    };
  }
  private async _templatePrompt(key: string) {
    return await inquirer.prompt(this.promptOption[key]);
  }
}
