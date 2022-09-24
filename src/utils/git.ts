import path from 'path';
import { cwd } from 'process';
import { simpleGit, SimpleGit, CleanOptions } from 'simple-git';
import { LOCAL_PATH } from '../constant';
const git: SimpleGit = simpleGit().clean(CleanOptions.FORCE);
const templateGit = simpleGit(LOCAL_PATH).clean(CleanOptions.FORCE);
export const gitClone = async (repo: string) =>
  await git.clone(repo, path.resolve(cwd(), LOCAL_PATH));

export const gitPull = async () => {
  return await templateGit.pull('origin');
};
