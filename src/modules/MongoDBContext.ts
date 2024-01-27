import { Collection, MongoClient, ServerApiVersion } from "mongodb"
import Environment from "../Environment"
import Singleton from "../Singleton"

export interface User {
    role: string,
    pass: string[],
    google: string[],
    valid_date: number
}

export interface Content {
    header: string
    body: string
}

export default class MongoDBContext {

    users: Collection<User>
    contents: Collection<Content>

    constructor() {
        const env = Singleton.getInstance(Environment)
        const client = new MongoClient(env.variables.Mongodb.url, {
            tlsCertificateKeyFile: env.root + "cert.pem",
            serverApi: ServerApiVersion.v1
        })
        client.connect()
        const database = client.db(env.variables.Mongodb.database)
        this.users = database.collection<User>("User")
        this.contents = database.collection<Content>("Contents")
    }
}