import { SaveRepository } from "../../../shared/Repository.interface"
import { GetUserTodoByIdRepository } from "../../application/Repository.interface"
import UserTodo from "../../domain/entity/UserTodo"

export default class UserTodoRepositoryInMemory implements Repository {
    private userTodoList: UserTodo[] = []
    async save(userTodo: UserTodo): Promise<void> {
        this.userTodoList.push(userTodo)
    }
    async getUserTodoByIdRepository(userId: string): Promise<UserTodo[]> {
        return this.userTodoList.filter(todo => todo.userId === userId)
    }
}

interface Repository extends GetUserTodoByIdRepository, SaveRepository<UserTodo> {}
