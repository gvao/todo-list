import { beforeAll, describe, expect, it } from "vitest"
import UserRepositoryInMemory from '../../../src/infra/repositories/UserRepositoryInMemory'
import Login from '../../../src/application/useCases/Login'
import TokenGenerate from "../../../src/domain/service/TokenGenerate"
import User from "../../../src/domain/entity/User"

describe('Login', () => {
    const input = { username: 'any_username', password: 'any_password' }
    const userRepository = new UserRepositoryInMemory()
    const tokenGenerate = new TokenGenerate('secret')
    const login = new Login(userRepository, tokenGenerate)
    beforeAll(async () => {
        const fakeUser = User.create(input)
        await userRepository.save(fakeUser)
    })
    
    it('should return acess token', async () => {
        const expectedToken = 'eyJhbGciOiJIUzI1NiJ9.YW55X3VzZXJuYW1l.2LGxQDd1Jzf3A_aKv01GxcsoXySCODioasWfR53y82k'
        const token = await login.execute(input)
        expect(token).toBe(expectedToken)
    })
})