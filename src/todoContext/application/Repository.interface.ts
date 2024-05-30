import { DeleteByIdRepository, GetAllRepository, GetByIdRepository, SaveRepository } from "../../shared/Repository.interface";
import Todo from "../domain/entity/Todo";

export type TodoRepository =
    GetAllRepository<Todo> &
    SaveRepository<Todo> &
    DeleteByIdRepository<Todo> &
    GetByIdRepository<Todo>

export type GetTodoByUserId = {
    getTodoByUserId(userId: string): Promise<Todo[]>
}