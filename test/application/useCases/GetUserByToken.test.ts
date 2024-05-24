import { describe, expect, it } from "vitest";
import UserRepositoryInMemory from '../../../src/infra/repositories/UserRepositoryInMemory'
import GetUserByToken from '../../../src/application/useCases/GetUserByToken'
import TokenGenerate from "../../../src/domain/service/TokenGenerate";
import User from "../../../src/domain/entity/User";
describe('GetUserByToken', () => {
    it('should return user dto', async () => {
        const user = User.create({ username: 'any_username', password: 'any_password' })
        const tokenGenerate = new TokenGenerate('secret')
        const token = tokenGenerate.generate(user.username)
        const repository = new UserRepositoryInMemory()
        await repository.save(user)
        const getUserByToken = new GetUserByToken(tokenGenerate, repository)
        const userDto = await getUserByToken.execute(token)
        expect(userDto?.username).toBe('any_username')
    })
})