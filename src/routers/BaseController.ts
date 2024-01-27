import { Router } from "express";
import Singleton from "../Singleton";
import MongoDBContext from "../modules/MongoDBContext";
import Environment from "../Environment";

export default abstract class BaseController {
    private _router: Router

    public get router(): Router {
        return this._router
    }

    protected set router(router: Router) {
        this._router = router
    }

    constructor(
        protected db: MongoDBContext = Singleton.getInstance(MongoDBContext),
        protected env = Singleton.getInstance(Environment).variables) { }
}