import RemoveTodo from "../../application/useCases/RemoveTodo"
import Route from "../../../shared/domain/Route"

export default class RemoveTodoController {
    constructor(readonly removeTodo: RemoveTodo) { }

    controller() {
        return new Route('DELETE', '/api/user/todo/:id', async (req, res) => {
            const { params: { id } } = req
            await this.removeTodo.execute(id)
            res.statusCode = 201
            res.end()
        })
    }
}

