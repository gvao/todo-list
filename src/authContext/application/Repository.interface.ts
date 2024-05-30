import User from "../domain/User";
import { SaveRepository } from '../../shared/Repository.interface'

export interface GetByUsernameRepository {
    getByUsername(username: string): Promise<User | undefined>
}

export type IUserRepository = SaveRepository<User> & GetByUsernameRepository