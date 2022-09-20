import path from 'path';
import { cwd } from 'process';
import { simpleGit, SimpleGit, CleanOptions } from 'simple-git';
const LOCAL_PATH = '.zeus/bolierplates';
const git: SimpleGit = simpleGit().clean(CleanOptions.FORCE);

export const gitClone = async (repo: string) => {
  await git.clone(repo, path.resolve(cwd(), LOCAL_PATH));
};
