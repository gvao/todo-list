const Repository = require("../Repository.interface.js");

module.exports = class UpdateTodoStatus {
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