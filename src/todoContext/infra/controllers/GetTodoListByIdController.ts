import Route from "../../../shared/domain/Route";
import { getToken } from "../../../shared/utils/getToken";
import GetTodoListById from "../../application/useCases/GetTodoListById";
import Controller from "./interface";

export default class GetTodoListByIdController implements Controller {
    constructor(readonly getTodoListById: GetTodoListById) { }

    controller = (): Route => new Route('GET', '/api/users/todo', async (req, res) => {
        const { headers: { authorization } } = req
        if (!authorization) throw new Error(`Invalid authorization`)
        const token = getToken(authorization)
        const todoList = await this.getTodoListById.execute(token)
        res.status!(200).json({ todoList })
    })
}