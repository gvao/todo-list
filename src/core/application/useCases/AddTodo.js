const Todo = require( "../../domain/Todo.js")
const Repository = require( "../Repository.interface.js")

module.exports = class AddTodo {

    /** @param {Repository} todoRepository  */
    constructor(todoRepository){
        this.todoRepository = todoRepository
    }

    execute(title) {
        const todo = Todo.create(title)
        this.todoRepository.save(todo)
    }
}