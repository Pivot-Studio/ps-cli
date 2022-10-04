import { Octokit } from 'octokit';
const AUTH = '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';
// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
const octokit = new Octokit({
  auth: AUTH,
});

// Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
export const getUserInfo = async () =>
  await octokit.rest.users.getAuthenticated();

export const getRepos = async (username: any) =>
  await octokit.rest.repos.listForUser({
    username,
  });
