import Todo from "../../domain/entity/Todo";
import { GetUserTodoByIdRepository } from "../Repository.interface";

export default class GetTodoListById {
    constructor(
        readonly todoRepository: GetUserTodoByIdRepository
    ) { }

    async execute(userId: string): Promise<Todo[]> {
        return await this.todoRepository.getUserTodoById(userId)
    }
}