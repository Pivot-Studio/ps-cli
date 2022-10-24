import github from '@/utils/git/github';
import inquirer from 'inquirer';
import { cwd } from 'process';
import { gitClone } from '@/utils/git/git';
import logger, { runningPrefixChalk } from '@/utils/logger';
import { Arguments } from 'yargs';
inquirer.registerPrompt('search-list', require('inquirer-search-list'));
export default class ClonePlugin {
  promptOption: any;
  constructor() {
    this._templateOptions();
  }
  getOptions() {
    return {};
  }
  async handler(argv: Arguments<{ url: string }>) {
    console.log(argv)
    // 获取用户信息&仓库
    // waiting...
    logger.pending('正在获取用户Github身份...');
    const userInfo = await github.getAuth();
    logger.success('获取用户Github信息成功！');

    if (argv.url) {
      await gitClone(argv.url, cwd());
      runningPrefixChalk(
        'Cloned!',
        `Your repository ${logger.blue(
          argv.url
        )} is cloned from origin Repository`
      );
      return;
    }
    const { where } = await this._templatePrompt('where');

    let data = [];
    if (where === 'user') {
      const { data: userData } = await github.getReposForUser(userInfo.login);
      data = userData;
    } else {
      const { data: orgData } = await github.getReposForOrg('Pivot-Studio');
      data = orgData;
    }

    const repos = data.map((repo) => ({
      name: `${repo.name}: ${repo.description ? repo.description : '无'}`,
      // value: repo,
      value: repo.clone_url,
    }));
    this.promptOption.repo.choices = repos;

    const { repository } = await this._templatePrompt('repo');
    await gitClone(repository, cwd());
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
    this.promptOption = {
      repo: {
        type: 'search-list',
        name: 'repository',
        message: 'which repository do you want to clone from Your Github ?',
        choices: [],
      },

      where: {
        type: 'rawlist',
        name: 'where',
        message:
          'where do you want to clone?(user: yourself | org: PivotStudio)',
        choices: ['user', 'org'],
      },
    };
  }
  private async _templatePrompt(key: 'repo' | 'where') {
    return await inquirer.prompt(this.promptOption[key]);
  }
}
