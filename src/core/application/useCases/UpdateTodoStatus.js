import Repository from "../Repository.interface.js";

export default class UpdateTodoStatus {
    /** @param {Repository} todoRepository */
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    execute(id, status) {
        const todo = this.todoRepository.getById(id)
        status ? todo.done() : todo.undone()
        this.todoRepository.save(todo)
    }
}