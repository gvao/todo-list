import UpdateTodoStatus from "../../application/useCases/UpdateTodoStatus"
import Route from "../../../shared/domain/Route"

export default class UpdateTodoStatusController {
    updateTodoStatus
    constructor(updateTodoStatus: UpdateTodoStatus) {
        this.updateTodoStatus = updateTodoStatus
    }

    controller() {
        return new Route('POST', '/api/todos/:id/changeStatus', async (req, res) => {
            const { id } = req.params
            const { status } = req.body
            await this.updateTodoStatus.execute(id, status)
            res.statusCode = 201
            res.end()
        })
    }
}

