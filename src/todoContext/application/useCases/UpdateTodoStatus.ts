import Todo from "../../domain/entity/Todo";
import { GetByIdRepository, SaveRepository } from "../../../shared/Repository.interface";

export default class UpdateTodoStatus {
    todoRepository
    constructor(todoRepository: SaveRepository<Todo> & GetByIdRepository<Todo>) {
        this.todoRepository = todoRepository;
    }
    async execute(id: string, status: boolean) {
        const todo = await this.todoRepository.getById(id)
        if (!todo) throw new Error(`Todo not found`)
        status ? todo.done() : todo.undone()
        this.todoRepository.save(todo)
    }
}