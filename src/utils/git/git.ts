import path from 'path';
import { cwd } from 'process';
import { simpleGit, SimpleGit, CleanOptions } from 'simple-git';
import { LOCAL_TEMPLATE } from '../../constant';
import { ensureDirSync } from 'fs-extra';
const commands = ['config', '--global', 'push.autoSetupRemote', 'true'];
const git: SimpleGit = simpleGit().raw(commands).clean(CleanOptions.FORCE);
ensureDirSync(LOCAL_TEMPLATE);
const templateGit = simpleGit(LOCAL_TEMPLATE).clean(CleanOptions.FORCE);
export const gitClone = async (
  repo: string,
  target = path.resolve(cwd(), LOCAL_TEMPLATE)
) => await git.clone(repo, target);

export const gitPull = async () => {
  return await templateGit.pull('origin');
};
// todo: git config --global push.autoSetupRemote true
export const gitPush = async (commitMsg: string) => {
  return await git.add('./*').commit(commitMsg).push('origin');
};

/**
* 获取用户的git config
*/
export const getGitConfig = async (key:string) => {
 return await git.getConfig(key)

}