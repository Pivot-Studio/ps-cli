import github from '@/utils/git/github';
import inquirer from 'inquirer';
import { cwd } from 'process';
import { gitClone } from '@/utils/git/git';
import logger, { runningPrefixChalk } from '@/utils/logger';
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
    logger.pending('正在获取用户Github身份...');
    const userInfo = await github.getAuth();
    const { data } = await github.getRepos(userInfo.login);
    logger.success('获取用户Github信息成功！');
    const repos = data.map((repo) => ({
      name: `${repo.name}: ${repo.description}`,
      value: repo,
    }));
    this.promptOption[0].choices = repos;
    const { repository } = await this._templatePrompt();
    await gitClone(repository.clone_url, cwd());
    runningPrefixChalk(
      'Cloned!',
      `Your repository ${logger.blue(
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
