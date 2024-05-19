import { GetByUsernameRepository, SaveRepository } from "../../application/Repository.interface"
import User from "../../domain/entity/User"

export default class UserRepositoryInMemory implements IUserRepository {
    users: User[] = []
    async save(user: User): Promise<void> {
        this.users.push(user)
    }
    async getByUsername(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username)
    }
}

type IUserRepository = SaveRepository<User> & GetByUsernameRepository<User>