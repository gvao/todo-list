const UpdateTodoStatus = require("../../application/useCases/UpdateTodoStatus.js")
const Route = require("../../infra/Route.js")

module.exports = class UpdateTodoStatusController {
    /**@param {UpdateTodoStatus} updateTodoStatus  */
    constructor(updateTodoStatus) {
        this.updateTodoStatus = updateTodoStatus
    }

    controller() {
        return new Route('POST', '/api/todos/:id/changeStatus', async (req, res) => {
            const { id } = req.params
            const { status } = req.body
            this.updateTodoStatus.execute(id, status)
            res.statusCode = 201
            res.end(() => { console.log(`ende controller Update status`) })
        })
    }
}

