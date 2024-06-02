import { GetByUsernameRepository } from "../../../authContext/application/Repository.interface";
import TokenGenerate from "../../../authContext/domain/service/TokenGenerate";
import { GetUserTodoByIdRepository } from "../Repository.interface";
import Todo from "../../domain/entity/Todo";

export default class GetTodoListById {
    constructor(
        readonly tokenGenerate: TokenGenerate,
        readonly userRepository: GetByUsernameRepository,
        readonly todoRepository: GetUserTodoByIdRepository
    ) { }

    async execute(token: string): Promise<Todo[]> {
        const username = this.tokenGenerate.verify(token) as string
        const user = await this.userRepository.getByUsername(username)
        if (!user) throw new Error(`user not found:`)
        return await this.todoRepository.getUserTodoById(user.id)
    }
}