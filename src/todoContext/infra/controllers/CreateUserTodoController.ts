import Route from "../../../shared/domain/Route";
import CreateUserTodo from "../../application/useCases/CreateUserTodo";
import Controller from "./interface";

export default class CreateUserTodoController implements Controller {
    constructor(private createUserTodo: CreateUserTodo) { }
    controller() {
        return new Route('POST', '/api/user/todo', async (req, res) => {
            const { body: { title, id: userId }, } = req
            await this.createUserTodo.execute({ title, userId })
            res.status!(201).json({ message: `Todo created!` })
        })
    }

}