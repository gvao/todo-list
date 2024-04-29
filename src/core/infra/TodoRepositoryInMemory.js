import Repository from "../application/Repository.interface.js";
import Todo from "../domain/Todo.js";

export default class TodoRepositoryInMemory extends Repository {
    #todos = []

    notify = () => this.emit(this.#todos)
    subscribe = listener => this.on(listener)

    /**  @param {Todo} todo  */
    save(todo) {
        const index = this.#todos.findIndex(todoFind => todoFind.id === todo.id)
        if (index < 0) {
            this.addTodo(todo)
        }
        this.#todos.splice(index, 1, todo)
        this.notify()
    }

    getAll() {
        return this.#todos;
    }

    getById(id) {
        return this.#todos.find(todo => todo.id === id);
    }

    deleteById(id) {
        const index = this.#todos.findIndex(todo => todo.id === id)
        if (index < 0) return console.log(`Item not found in list`)
        this.#todos.splice(index, 1)
        this.notify()
    }

    /**
     * @private
     * @param {Todo} todo 
    */
    addTodo(todo) {
        this.#todos.push(todo);
        this.notify()
    }

}