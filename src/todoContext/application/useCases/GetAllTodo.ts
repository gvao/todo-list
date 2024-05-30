import Todo from "../../domain/entity/Todo";
import { TodoDto } from "../../domain/todoTypes";
import Repository from "../../../shared/Repository.interface";

export default class GetAllTodo {
    todoRepository
    constructor(todoRepository: Repository<Todo>) {
        this.todoRepository = todoRepository;
    }
    async execute(): Promise<TodoDto[]> {
        const todos = await this.todoRepository.getAll()
        const dtos = todos.map(todo => todo.dto)
        return dtos
    }
}