import { Octokit } from 'octokit';
import zeusStorage from '../storage';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { PullRequestOptions } from '@/types/github';
class GithubKit {
  octokit: Octokit;
  constructor() {
    // Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
  }
  async _inputToken() {
    return await inquirer.prompt([
      {
        type: 'input',
        name: 'auth',
        message: `（Create a personal access token at ${chalk.cyan(
          'https://github.com/settings/tokens/new?scopes=repo'
        )}）请输入你的github账号token：`,
        validate: (input: string) => {
          if (!input) return '请输入你的github token';
          return true;
        },
      },
    ]);
  }
  async _getUserInfo() {
    return await this.octokit.rest.users.getAuthenticated();
  }
  async getAuth() {
    let auth = zeusStorage.get('auth');
    if (!auth) {
      const { auth: userAuth } = await this._inputToken();
      auth = userAuth;
    }
    if(!this.octokit){
      this.octokit = new Octokit({
        auth: auth.trim(),
      });
    }
    try {
      const { data } = await this._getUserInfo();
      zeusStorage.set('auth', auth);
      return data;
    } catch (error) {
      return error;
    }
  }
  /**
   * Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
   * 获取用户所有的仓库
   * @param username 
   * @returns 
   */
  async getRepos(username: string) {
    return await this.octokit.rest.repos.listForUser({
      username,
    });
  }
  /**
   * 创建一个Pull Request
   * @param options 
   * @returns 
   */
  async createMergeRequest(options: PullRequestOptions){
    return await this.octokit.rest.pulls.create({
      ...options
    });
  }
  
}
export default new GithubKit();
