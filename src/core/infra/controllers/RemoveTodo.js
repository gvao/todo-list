const RemoveTodo = require( "../../application/useCases/RemoveTodo.js")
const Route = require( "../../infra/Route.js")

module.exports = class RemoveTodoController {
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

