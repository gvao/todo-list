import Route from "../../domain/Route";
import Controller from "../../../todoContext/infra/controllers/interface";
import TokenGenerate from "../../../authContext/domain/service/TokenGenerate";
import { Middleware, Request, Response } from "../types";
import { getToken } from "../../utils/getToken";
import { GetByUsernameRepository } from "../../../authContext/application/Repository.interface";
import { AuthenticationFailedError } from "../errors/AuthenticationFailedError";

export default class PrivateRoute implements Controller {
    constructor(private tokenGenerate: TokenGenerate, private userRepository: GetByUsernameRepository) { }
    controller(controller: Controller): Route {
        const route = controller.controller()
        const errorRoute = new AuthenticationFailedError(route.method, route.path)
        const execHandler = (req: Request, res: Response) => () => errorRoute.handler(req, res)
        const handler: Middleware = async (req: Request, res: Response) => {
            const errorHandler = execHandler(req, res)
            const { headers: { authorization }, } = req
            if (!authorization) return errorHandler()
            const token = getToken(authorization)
            const { error, payload } = this.tokenGenerate.verify(token)
            if (error && !payload) return errorHandler()
            const user = await this.userRepository.getByUsername(payload as string)
            if (!user) return errorHandler()
            const { password, ...dto } = user.dto
            req.body = { ...req.body, ...dto, }
            route.handler(req, res)
        }

        return new Route(route.method, route.path, handler)
    }

    checkAuthorization = (authorization: string) => { }
}