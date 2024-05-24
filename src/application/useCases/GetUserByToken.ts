import User from "../../domain/entity/User"
import TokenGenerate from "../../domain/service/TokenGenerate"
import { GetByUsernameRepository } from "../Repository.interface"

export default class GetUserByToken {
    constructor(readonly TokenGenerate: TokenGenerate, readonly userRepository: GetByUsernameRepository<User>) {
    }
    async execute(token: string): Promise<Output | null> {
        const username = this.TokenGenerate.verify(token) as string
        const user = await this.userRepository.getByUsername(username)
        if (!user) return null
        const { password, ...dto } = user.dto
        return dto
    }
}

type Output = {
    username: string,
    id: string,
}