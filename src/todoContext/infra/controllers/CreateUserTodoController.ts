import { GetByUsernameRepository } from "../../../authContext/application/Repository.interface";
import TokenGenerate from "../../../authContext/domain/service/TokenGenerate";
import Route from "../../../shared/domain/Route";
import { getToken } from "../../../shared/utils/getToken";
import CreateUserTodo from "../../application/useCases/CreateUserTodo";
import Controller from "./interface";

export default class CreateUserTodoController implements Controller {
    constructor(private createUserTodo: CreateUserTodo, private tokenGenerate: TokenGenerate, private userRepository: GetByUsernameRepository ) { }
    controller() {
        return new Route('POST', '/api/users/todo', async (req, res) => {


            const {
                method,
                body: { title },
                headers: { authorization },
            } = req

            if (!authorization) throw new Error(`Invalid authorization`)
            const token = getToken(authorization)
            token
            const username = this.tokenGenerate.verify(token) as string
            const user = await this.userRepository.getByUsername(username)
            if (!user) return null
            
            await this.createUserTodo.execute({ title, userId: user.id })
            res.writeHead(201, { "Content-Type": "application/json" })
            res.end(JSON.stringify({ message: `Todo created!` }))
        })
    }

}