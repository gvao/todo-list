import User from "../../domain/User"
import { GetByUsernameRepository, SaveRepository } from "../../../shared/Repository.interface"

export default class Signup {

    constructor(private userRepository: UserRepository) {}

    async execute({ username, password }: SignupInput): Promise<void> {
        const userExisting = await this.userRepository.getByUsername(username)
        if(!!userExisting) throw new Error('user already exists')
        const user = User.create({ username, password })
        await this.userRepository.save(user)
    }
}

type UserRepository = SaveRepository<User> & GetByUsernameRepository<User>

type SignupInput = {
    username: string
    password: string
}