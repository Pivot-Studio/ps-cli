export interface PullRequestOptions{
  /**
   * The account owner of the repository. The name is not case sensitive.
   **/
  owner:string;
  /**
   * The name of repository.
   **/
  repo:string;
  /**
   * The name of the branch where your changes are implemented.
   **/
  head:string;
  /**
   * The name of the branch you want the changes pulled into.
   **/
  base:string;
  /**
   * The title of the new pull request
   **/
  title?:string;
  /**
   * The contents of the pull request.
   */
  body?:string;
  
}