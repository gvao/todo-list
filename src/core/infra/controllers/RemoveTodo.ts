import RemoveTodo from "../../application/useCases/RemoveTodo"
import Route from "../Route"

export default class RemoveTodoController {
    removeTodo
    constructor(removeTodo: RemoveTodo) {
        this.removeTodo = removeTodo
    }

    controller() {
        return new Route('DELETE', '/api/todos/:id', async (req, res) => {
            const { params } = req
            this.removeTodo.execute(params.id)
            res.statusCode = 201
            res.end()
        })
    }
}

