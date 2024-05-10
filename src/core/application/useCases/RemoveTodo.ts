import Todo from "../../domain/Todo.js";
import Repository from "../Repository.interface.js";

export default class RemoveTodo {
    todoRepository
    constructor(todoRepository: Repository<Todo>) {
        this.todoRepository = todoRepository;
    }
    execute(id: string){
        this.todoRepository.deleteById(id)
    }
}