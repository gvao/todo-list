import { DeleteByIdRepository, GetAllRepository, GetByIdRepository, SaveRepository } from "../../shared/Repository.interface";
import Todo from "../domain/entity/Todo";
import UserTodo from "../domain/entity/UserTodo";

export type TodoRepository =
    GetAllRepository<Todo> &
    SaveRepository<Todo> &
    DeleteByIdRepository<Todo> &
    GetByIdRepository<Todo>

export type GetTodoByUserId = {
    getTodoByUserId(userId: string): Promise<Todo[]>
}

export type GetUserTodoByIdRepository = {
    getUserTodoByIdRepository(UserId: string): Promise<UserTodo[]>
}