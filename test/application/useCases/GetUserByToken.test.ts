import { describe, expect, it } from "vitest";
import UserRepositoryInMemory from '../../../src/authContext/infra/repositories/UserRepositoryInMemory'
import GetUserByToken from '../../../src/authContext/application/useCases/GetUserByToken'
import TokenGenerate from "../../../src/authContext/domain/service/TokenGenerate";
import User from "../../../src/authContext/domain/User";
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