import User from "../../domain/entity/User";
import TokenGenerate from "../../domain/service/TokenGenerate";
import { GetByUsernameRepository } from "../Repository.interface";

export default class Login {
    constructor(private userRepository: userRepository, private tokenGenerate: TokenGenerate) { }
    async execute({ username, password }: LoginInput) {
        const user = await this.userRepository.getByUsername(username)
        if (!user) throw new Error('Authentication failed')
        const passwordValid = user.passwordValidate(password)
        if (!passwordValid) throw new Error('Authentication failed')
        const token = this.tokenGenerate.generate(username)
        return token
    }
}

type LoginInput = {
    username: string,
    password: string,
}

type userRepository = GetByUsernameRepository<User>