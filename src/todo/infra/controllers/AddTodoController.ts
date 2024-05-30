import AddTodo from "../../application/useCases/AddTodo"
import Route from "../../../shared/domain/Route"

export default class AddTodoController {
    addTodo
    constructor(addTodo: AddTodo) {
        this.addTodo = addTodo
    }

    controller() {
        return new Route('POST', '/api/todos', async (req, res) => {
            const body = req.body
            await this.addTodo.execute(body.title)
            res.writeHead(201, { "Content-Type": "application/json" })
            res.end(JSON.stringify({ message: `Todo created!` }))
        })
    }
}

