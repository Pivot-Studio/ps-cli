import { Octokit } from 'octokit';
import zeusStorage from '../storage';
import inquirer from 'inquirer';
import chalk from 'chalk';
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
  async getAuth() {
    let auth = zeusStorage.get('auth');
    if (!auth) {
      const { auth: userAuth } = await this._inputToken();
      auth = userAuth;
    }
    this.octokit = new Octokit({
      auth,
    });
    try {
      const { data } = await this._getUserInfo();
      zeusStorage.set('auth', auth);
      return data
    } catch (error) {
      return error
    }
  }
  async _getUserInfo() {
    return await this.octokit.rest.users.getAuthenticated();
  }
  // Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
  async getRepos(username: string) {
    return await this.octokit.rest.repos.listForUser({
      username,
    });
  }
}
export default new GithubKit();
