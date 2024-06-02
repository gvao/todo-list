import Todo from "../domain/entity/Todo";
import UserTodo from "../domain/entity/UserTodo";
import { DeleteByIdRepository, GetAllRepository, GetByIdRepository, SaveRepository } from "../../shared/Repository.interface";
export * from "../../shared/Repository.interface"

export type TodoRepository =
    GetAllRepository<Todo> &
    SaveRepository<Todo> &
    DeleteByIdRepository<Todo> &
    GetByIdRepository<Todo>

export type GetTodoByUserId = {
    getTodoByUserId(userId: string): Promise<Todo[]>
}

export type GetUserTodoByIdRepository = {
    getUserTodoById(UserId: string): Promise<UserTodo[]>
}