import Todo from "../../domain/entity/Todo";
import { DeleteByIdRepository } from "../Repository.interface";

export default class RemoveTodo {
    todoRepository
    constructor(todoRepository: DeleteByIdRepository<Todo>) {
        this.todoRepository = todoRepository;
    }
    async execute(id: string){
        await this.todoRepository.deleteById(id)
    }
}