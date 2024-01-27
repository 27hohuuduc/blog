"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Environment_1 = __importDefault(require("./Environment"));
const env = Environment_1.default.getInstance();
console.log(env);
// const app: Express = express();
// const server = app.listen(process.env.PORT || 3000, () => {
//     console.log("Runnning")
// })
class StartUp {
    constructor() {
    }
    run() {
    }
}
