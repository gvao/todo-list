import AddTodo from "../../application/useCases/AddTodo.js"
import Route from "../../domain/Route.js"

export default class AddTodoController {
    /**@param {AddTodo} addTodo  */
    constructor(addTodo){
        this.addTodo = addTodo
    }

    controller(){
        return new Route('POST', '/api/todos', (req, res) => {
            const chunks = []
            req.on('data', chunk => {
                chunks.push(chunk)
            })
        
            req.on('end', () => {
                const result = Buffer.concat(chunks).toString()
                const body = JSON.parse(result)
        
                addTodo.execute(body.title)
                res.writeHead(201, { "Content-Type": "application/json" })
                res.end(JSON.stringify({ message: `Todo created!` }))
            })
        })
    }
}

