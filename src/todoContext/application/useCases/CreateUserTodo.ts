import UserTodo, { UserTodoCreateProps } from "../../domain/entity/UserTodo";
import { SaveRepository } from "../Repository.interface";

export default class CreateUserTodo {
    constructor(private userTodoRepository: Repository){}
    async execute({ title, userId }: UserTodoCreateProps) {
        const userTodo = UserTodo.create({ title, userId })
        this.userTodoRepository.save(userTodo)
    }
}

type Repository = SaveRepository<UserTodo>