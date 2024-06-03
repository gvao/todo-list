import Route from "../../../shared/domain/Route";
import GetTodoListById from "../../application/useCases/GetTodoListById";
import Controller from "./interface";

export default class GetTodoListByIdController implements Controller {
    constructor(readonly getTodoListById: GetTodoListById) { }

    controller = (): Route => new Route('GET', '/api/user/todo', async (req, res) => {
        const {
            body: { id: userId },
            headers: { host },
        } = req
        const url = new URL(req.url!, `http://${host}`)
        const search = url.searchParams.get('search')
        const todoList = await this.getTodoListById.execute(userId)
        const todoFiltered = todoList.filter(todo => !search ? true : todo.title.includes(search))

        res.status!(200).json({ todoList: todoFiltered })
    })
}