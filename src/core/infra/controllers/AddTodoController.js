import AddTodo from "../../application/useCases/AddTodo.js"
import Route from "../../domain/Route.js"

export default class AddTodoController {
    /**@param {AddTodo} addTodo  */
    constructor(addTodo){
        this.addTodo = addTodo
    }

    controller(){
        return new Route('POST', '/api/todos', (req, res) => {
            const body = req.body
            this.addTodo.execute(body.title)
            res.writeHead(201, { "Content-Type": "application/json" })
            res.end(JSON.stringify({ message: `Todo created!` }))
        })
    }
}

