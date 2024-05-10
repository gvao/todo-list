import Todo from "../../domain/Todo"
import Repository from "../Repository.interface"

export default class AddTodo {
    todoRepository
    constructor(todoRepository: Repository<Todo>) {
        this.todoRepository = todoRepository
    }

    execute(title: string): void {
        const todo = Todo.create(title)
        this.todoRepository.save(todo)
    }
}