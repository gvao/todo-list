import { GetByIdRepository, SaveRepository } from "../../../shared/Repository.interface"
import { GetUserTodoByIdRepository } from "../../application/Repository.interface"
import UserTodo from "../../domain/entity/UserTodo"

export default class UserTodoRepositoryInMemory implements Repository {
    private userTodoList: UserTodo[] = []
    async getById(id: string): Promise<UserTodo | undefined> {
        return this.userTodoList.find(todo => todo.id === id)
    }
    async save(userTodo: UserTodo): Promise<void> {
        this.userTodoList.push(userTodo)
    }
    async getUserTodoById(userId: string): Promise<UserTodo[]> {
        return this.userTodoList.filter(todo => todo.userId === userId)
    }
}

interface Repository extends GetUserTodoByIdRepository, SaveRepository<UserTodo>, GetByIdRepository<UserTodo> { }
