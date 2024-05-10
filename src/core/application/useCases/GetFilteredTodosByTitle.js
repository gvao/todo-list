const Repository = require("../Repository.interface.js");

module.exports = class GetFilteredTodosByTitle {
    #todoRepository
    /** @param {Repository} todoRepository  */
    constructor(todoRepository) {
        this.#todoRepository = todoRepository;
    }
    /** @param {string} search  */
    execute(search) {
        const todos = this.#todoRepository.getAll()
        if (!search) return todos
        const searchToLowerCase = search.toLowerCase()
        return todos.filter(({ title }) =>
            title.toLowerCase().includes(searchToLowerCase))
    }
}