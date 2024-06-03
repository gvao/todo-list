import { GetByUsernameRepository } from "../../../authContext/application/Repository.interface";
import TokenGenerate from "../../../authContext/domain/service/TokenGenerate";
import Route from "../../../shared/domain/Route";
import CreateUserTodo from "../../application/useCases/CreateUserTodo";
import Controller from "./interface";

export default class CreateUserTodoController implements Controller {
    constructor(private createUserTodo: CreateUserTodo, private tokenGenerate: TokenGenerate, private userRepository: GetByUsernameRepository ) { }
    controller() {
        return new Route('POST', '/api/user/todo', async (req, res) => {
            const {
                method,
                body: { title, id: userId },
            } = req
            await this.createUserTodo.execute({ title, userId })
            res.writeHead(201, { "Content-Type": "application/json" })
            res.end(JSON.stringify({ message: `Todo created!` }))
        })
    }

}