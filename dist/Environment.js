"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class Environment {
    static getInstance() {
        if (!Environment.instance)
            Environment.instance = new Environment();
        return Environment.instance;
    }
    constructor() {
        if (process.env.NODE_ENV === "production") {
            this.root = "/etc/secrets/";
            this.port = process.env.PORT;
        }
        else {
            this.root = "./etc/secrets/";
            this.port = 5000;
        }
        this.variables = JSON.parse(fs_1.default.readFileSync(this.root + "config.json", "utf8"));
        this.cert = fs_1.default.readFileSync(this.root + "cert.pem", "utf8");
    }
}
exports.default = Environment;
