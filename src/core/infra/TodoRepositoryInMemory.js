import Repository from "../application/Repository.interface.js";
import Todo from "../domain/Todo.js";


const todos = [
    Todo.create("Fazer isso"),
    Todo.create("Fazer aquilo"),
    Todo.create("Fazer tal coisa"),
    Todo.create("Musculação"),
];

todos[1].done()
todos[2].done()

export default class TodoRepositoryInMemory extends Repository {
    #todos = todos

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