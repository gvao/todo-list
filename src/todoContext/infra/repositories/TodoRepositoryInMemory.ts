import { TodoRepository } from "../../application/Repository.interface";
import Todo from "../../domain/entity/Todo";

export default class TodoRepositoryInMemory implements TodoRepository {
    #todoList: Todo[] = []
    // async getTodoByUserId(userId: string): Promise<Todo[]> {
    //     return this.#todoList.filter(todo => todo.userId === userId)
    //     throw new Error("Method not implemented.");
    // }

    async save(todo: Todo) {
        const index = this.#todoList.findIndex(todoFind => todoFind.id === todo.id)
        if (index < 0) this.addTodo(todo)
        this.#todoList.splice(index, 1, todo)
    }

    getAll = async () => this.#todoList;

    getById = async (id: string) => this.#todoList.find(todo => todo.id === id)

    deleteById = async (id: string) => {
        const index = this.#todoList.findIndex(todo => todo.id === id)
        if (index < 0) return console.log(`Item not found in list`)
        this.#todoList.splice(index, 1)
    }

    private addTodo = async (todo: Todo) => {
        this.#todoList.push(todo);
    }
}