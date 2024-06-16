import UserTodo from "../../domain/entity/UserTodo";
import { DeleteByIdRepository } from "../Repository.interface";

export default class RemoveTodo {
    constructor(readonly userTodoRepository: DeleteByIdRepository<UserTodo>) {}
    async execute(id: string){
        await this.userTodoRepository.deleteById(id)
    }
}