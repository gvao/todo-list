import AddTodo from "../../application/useCases/AddTodo"
import Route from "../../infra/Route"

export default class AddTodoController {
    addTodo
    constructor(addTodo: AddTodo) {
        this.addTodo = addTodo
    }

    controller() {
        return new Route('POST', '/api/todos', (req, res) => {
            const body = req.body
            this.addTodo.execute(body.title)
            res.writeHead(201, { "Content-Type": "application/json" })
            res.end(JSON.stringify({ message: `Todo created!` }))
        })
    }
}

