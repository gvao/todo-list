import Todo from "../../domain/Todo.js";
import Repository from "../Repository.interface.js";

export default class GetAllTodo {
    /** @param {Repository} todoRepository  */
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    /** @returns {Todo[]} */
    execute() {
        const todos = this.todoRepository.getAll()
        const dtos = todos.map(todo => todo.dto)
        return dtos
    }
}