import path from 'path';
import { cwd } from 'process';
import { simpleGit, SimpleGit, CleanOptions } from 'simple-git';
import { LOCAL_TEMPLATE } from '../../constant';
const git: SimpleGit = simpleGit().clean(CleanOptions.FORCE);
const templateGit = simpleGit(LOCAL_TEMPLATE).clean(CleanOptions.FORCE);
export const gitClone = async (
  repo: string,
  target = path.resolve(cwd(), LOCAL_TEMPLATE)
) => await git.clone(repo, target);

export const gitPull = async () => {
  return await templateGit.pull('origin');
};

export const gitPush = async (commitMsg: string) => {
  return await git.add('./*').commit(commitMsg).push('origin', 'master');
}