import Todo from "../../domain/Todo";
import Repository from "../Repository.interface"

export default class GetFilteredTodosByTitle {
    #todoRepository
    constructor(todoRepository: Repository<Todo>) {
        this.#todoRepository = todoRepository;
    }
    execute(search: string) {
        const todos = this.#todoRepository.getAll()
        if (!search) return todos
        const searchToLowerCase = search.toLowerCase()
        return todos.filter(({ title }) =>
            title.toLowerCase().includes(searchToLowerCase))
    }
}