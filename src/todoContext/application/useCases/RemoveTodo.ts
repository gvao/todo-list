import Todo from "../../domain/entity/Todo";
import Repository from "../../../shared/Repository.interface";

export default class RemoveTodo {
    todoRepository
    constructor(todoRepository: Repository<Todo>) {
        this.todoRepository = todoRepository;
    }
    async execute(id: string){
        await this.todoRepository.deleteById(id)
    }
}