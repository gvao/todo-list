import Route from "../../domain/Route";
import { Method, Middleware } from "../types";

export class AuthenticationFailedError implements Route {
    handler: Middleware;
    constructor(readonly method: Method, readonly path: string) {
        this.handler = (req, res) => {
            res.status!(404).json({ message: `authentication failed` })
        }
    }
    getParameters(pathRoute: string): Record<string, any> {
        throw new Error("Method not implemented.");
    }

}