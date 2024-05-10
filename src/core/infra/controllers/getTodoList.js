const GetAllTodo = require("../../application/useCases/GetAllTodo.js")
const Route = require("../../infra/Route.js")

module.exports = class GetTodoListController {
    /**@param {GetAllTodo} getAllTodo  */
    constructor(getAllTodo) {
        this.getAllTodo = getAllTodo
    }

    controller() {
        return new Route('GET', '/api/todos', (req, res) => {
            const url = new URL(req.url, `http://${req.headers.host}`)
            const search = url.searchParams.get('search')
            res.writeHead(200, { 'Content-Type': 'application/json' })
            const allTodoList = this.getAllTodo.execute()
            const todoFiltered = allTodoList.filter(todo => !search ? true : todo.title.includes(search))

            res.end(JSON.stringify(todoFiltered))
        })
    }
}

