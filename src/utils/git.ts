import path from 'path';
import { cwd } from 'process';
import { simpleGit, SimpleGit, CleanOptions } from 'simple-git';

const git: SimpleGit = simpleGit().clean(CleanOptions.FORCE);

export const gitClone = async (repo: string) => {
  await git.clone(repo, path.resolve(cwd(), '.zeus/bolierplates'));
};
