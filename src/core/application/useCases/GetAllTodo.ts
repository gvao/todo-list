import Todo from "../../domain/Todo";
import { TodoDto } from "../../domain/types";
import Repository from "../Repository.interface";

export default class GetAllTodo {
    todoRepository
    constructor(todoRepository: Repository<Todo>) {
        this.todoRepository = todoRepository;
    }
    execute(): TodoDto[] {
        const todos = this.todoRepository.getAll()
        const dtos = todos.map(todo => todo.dto)
        return dtos
    }
}