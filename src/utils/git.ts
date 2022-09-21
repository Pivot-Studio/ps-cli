import path from 'path';
import { cwd } from 'process';
import { simpleGit, SimpleGit, CleanOptions } from 'simple-git';
import { LOCAL_PATH } from './index';
const git: SimpleGit = simpleGit().clean(CleanOptions.FORCE);

export const gitClone = async (repo: string) =>
  await git.clone(repo, path.resolve(cwd(), LOCAL_PATH));

export const gitPull = async () => {
  const res = await git.pull('origin');
  console.log(res);
};
