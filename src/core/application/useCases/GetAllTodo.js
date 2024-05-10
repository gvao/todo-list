const Todo = require("../../domain/Todo.js");
const Repository = require("../Repository.interface.js");

module.exports = class GetAllTodo {
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