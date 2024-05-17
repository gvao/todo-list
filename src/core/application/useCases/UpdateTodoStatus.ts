import Todo from "../../domain/Todo";
import { GetByIdRepository, SaveRepository } from "../Repository.interface";

export default class UpdateTodoStatus {
    todoRepository
    constructor(todoRepository: SaveRepository<Todo> & GetByIdRepository<Todo>) {
        this.todoRepository = todoRepository;
    }
    execute(id: string, status: boolean) {
        const todo = this.todoRepository.getById(id)
        if (!todo) throw new Error(`Todo not found`)
        status ? todo.done() : todo.undone()
        this.todoRepository.save(todo)
    }
}