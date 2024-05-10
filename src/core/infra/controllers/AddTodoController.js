const AddTodo = require("../../application/useCases/AddTodo.js")
const Route = require("../../infra/Route.js")

module.exports = class AddTodoController {
    /**@param {AddTodo} addTodo  */
    constructor(addTodo) {
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

