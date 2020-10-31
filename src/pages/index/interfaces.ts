export interface RequestGithubUser {
  bio: string,
  name: string,
  login: string,
  location: string,
  followers: number,
  following: number,
  avatar_url: string,
  public_repos: number,
}

export interface RequestGithubRepositories {
  id: string,
  name: string,
  html_url: string,
  description: string | null,
}