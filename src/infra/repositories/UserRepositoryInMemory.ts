import { SaveRepository } from "../../application/Repository.interface"
import User from "../../domain/entity/User"

export default class UserRepositoryInMemory implements SaveRepository<User> {
    users: User[] = []
    async save(user: User): Promise<void> {
        this.users.push(user)
    }
}