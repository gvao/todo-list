import Repository from '../../application/Repository.interface'
import Todo from "../../domain/Todo";

export default class TodoRepositoryInMemory implements Repository<Todo> {
    #todos: Todo[] = []

    save(todo: Todo) {
        const index = this.#todos.findIndex(todoFind => todoFind.id === todo.id)
        if (index < 0) {
            this.addTodo(todo)
        }
        this.#todos.splice(index, 1, todo)
    }

    getAll() {
        return this.#todos;
    }

    getById(id: string) {
        return this.#todos.find(todo => todo.id === id);
    }

    deleteById(id: string) {
        const index = this.#todos.findIndex(todo => todo.id === id)
        if (index < 0) return console.log(`Item not found in list`)
        this.#todos.splice(index, 1)
    }
    addTodo(todo: Todo) {
        this.#todos.push(todo);
    }

}