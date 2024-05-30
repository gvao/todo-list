import User from "../../domain/User"
import { IUserRepository } from "../../application/Repository.interface"

export default class UserRepositoryInMemory implements IUserRepository {
    users: User[] = []
    async save(user: User): Promise<void> {
        this.users.push(user)
    }
    async getByUsername(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username)
    }
}

