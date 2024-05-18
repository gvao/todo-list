import User from "../../domain/entity/User"
import { SaveRepository } from "../Repository.interface"

export default class Signup {

    constructor(private userRepository: UserRepository) {}

    async execute({ username, password }: SignupInput): Promise<void> {
        const user = User.create({ username, password })
        await this.userRepository.save(user)
    }
}

type UserRepository = SaveRepository<User>

type SignupInput = {
    username: string
    password: string
}