import { NextFunction, Request, Response, Router } from "express"
import { User } from "../modules/MongoDBContext"
import { Filter } from "mongodb"
import jwt from "jsonwebtoken"
import { UnauthorizedError } from "../modules/SelfDefinedError"
import { OAuth2Client } from "google-auth-library"
import BaseController from "./BaseController"
import AuthController from "./AuthController"
import Singleton from "../Singleton"

export default class ApiController extends BaseController {

    constructor(
        private authController: AuthController = Singleton.getInstance(AuthController),
        private oAuth2Client: OAuth2Client = new OAuth2Client()) {

        super()

        const router = Router()

        //Auth
        router.post("/basic", this.basicHandle.bind(this))

        router.post("/google", this.googleHandle.bind(this))

        router.use(authController.router)

        //NotFound
        router.use((req, res, next) => {
            res.status(404).send('Not Found')
        })

        this.router = Router().use("/api", router)

    }

    basicHandle(req: Request, res: Response) {
        this.verify(res, { pass: req.body.password })
    }

    async googleHandle(req: Request, res: Response, next: NextFunction) {
        try {
            const ticket = await this.oAuth2Client.verifyIdToken({
                idToken: req.body.token
            })

            this.verify(res, { google: ticket.getUserId() })
        } catch {
            next(new UnauthorizedError())
        }
    }

    async verify(res: Response, query: Filter<User>) {
        const user = await this.db.users.findOne(query)
        if (user) {
            const token = jwt.sign({
                role: user.role,
                iat: Date.now()
            }, this.env.SecretKey, {
                expiresIn: this.env.Expires
            })

            res.json({ token })
        }
        else {
            res.status(401).send("Invalid Password")
        }
    }
}