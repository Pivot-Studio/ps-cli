import { getUserInfo, getRepos } from '@/utils/git/github';
import inquirer from 'inquirer';
import { CreateOption } from '@/types/createPlugin';
import { cwd } from 'process';
import { gitClone } from '@/utils/git/git';
import { blueChalk, runningPrefixChalk } from '@/utils/chalk';
inquirer.registerPrompt('search-list', require('inquirer-search-list'));
export default class CreatePlugin {
  promptOption: any;
  constructor() {
    this._templateOptions();
  }
  getOptions() {
    return {};
  }
  async handler() {
    // 获取用户信息&仓库
    // waiting...
    const { data: userInfo } = await getUserInfo();
    const { data } = await getRepos(userInfo.login);
    const repos = data.map((repo) => ({
      name: `${repo.name}: ${repo.description}`,
      value: repo,
    }));
    this.promptOption[0].choices = repos;
    const { repository } = await this._templatePrompt();
    await gitClone(repository.clone_url, cwd());
    runningPrefixChalk(
      'Cloned!',
      `Your repository ${blueChalk(
        repository.name
      )} is cloned from origin Repository`
    );
  }
  /**
   * 解析选项
   */
  private _templateOptions() {
    this.promptOption = [
      {
        type: 'search-list',
        name: 'repository',
        message: 'which repository do you want to clone from Your Github ?',
        choices: [],
      },
    ];
  }
  private async _templatePrompt() {
    return await inquirer.prompt(this.promptOption);
  }
}
