import RemoveTodo from "../../application/useCases/RemoveTodo.js"
import Route from "../../domain/Route.js"

export default class RemoveTodoController {
    /**@param {RemoveTodo} removeTodo  */
    constructor(removeTodo) {
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

