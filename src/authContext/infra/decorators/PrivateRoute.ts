import Route from "../../../shared/domain/Route";
import Controller from "../../../todoContext/infra/controllers/interface";
import TokenGenerate from "../../domain/service/TokenGenerate";
import { Middleware, Request, Response } from "../../../shared/infra/types";
import { getToken } from "../../../shared/utils/getToken";
import { GetByUsernameRepository } from "../../application/Repository.interface";

export default class PrivateRoute implements Controller {
    constructor(private tokenGenerate: TokenGenerate, private userRepository: GetByUsernameRepository) { }
    controller(controller: Controller): Route {
        const route = controller.controller()
        const handler: Middleware = async (req: Request, res: Response) => {
            const {
                headers: { authorization },
            } = req
            if (!authorization) throw new Error(`Invalid authorization`)
            const token = getToken(authorization)
            const username = this.tokenGenerate.verify(token) as string
            const user = await this.userRepository.getByUsername(username)
            if (!user) return null
            const { password, ...dto } = user.dto
            if (!user) {
                res.status!(404).json()
                return
            }
            req.body = { ...req.body, ...dto, }
            route.handler(req, res)
        }

        return new Route(route.method, route.path, handler)
    }
}