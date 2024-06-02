import { GetByUsernameRepository } from "../Repository.interface"

export default class GetUserByUsername {
    constructor(readonly userRepository: GetByUsernameRepository) {
    }
    async execute(username: string): Promise<Output | null> {
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