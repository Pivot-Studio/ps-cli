import { cwd } from 'process';
import { simpleGit, SimpleGit, CleanOptions } from 'simple-git';
import { LOCAL_TEMPLATE } from '../../constant';
const commands = ['config', '--global', 'push.autoSetupRemote', 'true'];
const git: SimpleGit = simpleGit().raw(commands).clean(CleanOptions.DRY_RUN);

export const gitClone = async (repo: string, target = cwd()) =>
  await git.clone(repo, target);

export const gitPull = async () => {
  const templateGit = simpleGit(LOCAL_TEMPLATE).clean(CleanOptions.DRY_RUN);
  return await templateGit.pull('origin');
};
// todo: git config --global push.autoSetupRemote true
export const gitPush = async (commitMsg: string) => {
  return await git.add('./*').commit(commitMsg).push('origin');
};

/**
 * 获取用户的git config
 */
export const getGitConfig = async (key: string) => {
  return await git.getConfig(key);
};

export const getCurrentBranch = async (options?: string[]) => {
  return await git.branch(options);
};
