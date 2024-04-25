import Todo from "../../domain/Todo.js"
import Repository from "../Repository.interface.js"

export default class AddTodo {

    /** @param {Repository} todoRepository  */
    constructor(todoRepository){
        this.todoRepository = todoRepository
    }

    execute(title) {
        const todo = Todo.create(title)
        this.todoRepository.save(todo)
    }
}