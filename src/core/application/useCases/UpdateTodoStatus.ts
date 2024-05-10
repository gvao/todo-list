import Todo from "../../domain/Todo.js";
import Repository from "../Repository.interface.js";

export default class UpdateTodoStatus {
    todoRepository
    constructor(todoRepository: Repository<Todo>) {
        this.todoRepository = todoRepository;
    }
    execute(id: string, status: string) {
        const todo = this.todoRepository.getById(id)
        if(!todo) throw new Error(`Todo not found`)
        status ? todo.done() : todo.undone()
        this.todoRepository.save(todo)
    }
}