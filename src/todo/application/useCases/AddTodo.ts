import Todo from "../../domain/entity/Todo"
import Repository from "../../../shared/Repository.interface"

export default class AddTodo {
    todoRepository
    constructor(todoRepository: Repository<Todo>) {
        this.todoRepository = todoRepository
    }

    async execute(title: string): Promise<void> {
        const todo = Todo.create(title)
        await this.todoRepository.save(todo)
    }
}