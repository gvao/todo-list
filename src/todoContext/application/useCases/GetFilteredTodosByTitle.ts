import Todo from "../../domain/entity/Todo";
import { GetAllRepository } from "../../../shared/Repository.interface"

export default class GetFilteredTodosByTitle {
    #todoRepository
    constructor(todoRepository: GetAllRepository<Todo>) {
        this.#todoRepository = todoRepository;
    }
    async execute(search: string) {
        const todos = await this.#todoRepository.getAll()
        if (!search) return todos
        const searchToLowerCase = search.toLowerCase()
        return todos.filter(({ title }) =>
            title.toLowerCase().includes(searchToLowerCase))
    }
}