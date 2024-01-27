import fs from "fs"

export type Config = {
    GitHub: {
        owner: string,
        repo: string,
        branch: string,
        message: string,
        token: string
    },
    SecretKey: string,
    Expires: string,
    Mongodb: {
        url: string,
        database: string
    },
    Origin: string
}

export default class Environment {

    private _root: string
    private _port: string
    private _variables: Config

    get root(): string {
        return this._root
    }

    get port(): string {
        return this._port
    }

    get variables(): Config {
        return this._variables
    }

    constructor() {
        if (process.env.NODE_ENV === "production") {
            this._root = "/etc/secrets/"
            this._port = process.env.PORT
        }
        else {
            this._root = "./etc/secrets/"
            this._port = "5000"
        }
        this._variables = JSON.parse(fs.readFileSync(this.root + "config.json", "utf8"))
    }
}