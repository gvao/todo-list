import Todo from "../../domain/Todo";
import Repository from "../Repository.interface";

export default class RemoveTodo {
    todoRepository
    constructor(todoRepository: Repository<Todo>) {
        this.todoRepository = todoRepository;
    }
    execute(id: string){
        this.todoRepository.deleteById(id)
    }
}