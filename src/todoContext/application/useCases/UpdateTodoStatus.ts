import { GetByIdRepository, SaveRepository } from "../../../shared/Repository.interface";
import UserTodo from "../../domain/entity/UserTodo";

export default class UpdateTodoStatus {
    userTodoRepository
    constructor(userTodoRepository: Repository) {
        this.userTodoRepository = userTodoRepository;
    }
    async execute(id: string, status: boolean) {
        const todo = await this.userTodoRepository.getById(id)
        if (!todo) throw new Error(`Todo not found`)
        status ? todo.done() : todo.undone()
        this.userTodoRepository.save(todo)
    }
}

type Repository = SaveRepository<UserTodo> & GetByIdRepository<UserTodo>