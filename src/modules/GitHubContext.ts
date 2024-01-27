import { Octokit } from "@octokit/rest"
import Singleton from "../Singleton"
import Environment, { Config } from "../Environment"

export default class GithubContext {

    constructor(
        private env: Config = Singleton.getInstance(Environment).variables,
        private octokit: Octokit = new Octokit({
            auth: env.GitHub.token,
        })) {

    }

    upload(name: string, buffer: Buffer, callback: Function, sha: string = "") {
        const content = buffer.toString('base64')
        this.octokit.repos.createOrUpdateFileContents({
            owner: this.env.GitHub.owner,
            repo: this.env.GitHub.repo,
            branch: this.env.GitHub.branch,
            path: name,
            sha: sha,
            content: content,
            message: this.env.GitHub.message
        }).then(x => {
            callback(x)
        }).catch(x => {
            console.log(x)
        })
    }
}