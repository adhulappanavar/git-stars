export interface QueryResponse {
    allReposes: Array<Repo>
}

export interface Repo {
    id: string,
    repoName: string,
    LogoUrl: string,
    likes: number
}
