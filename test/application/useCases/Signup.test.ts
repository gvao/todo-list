import { describe, expect, it } from "vitest";
import Signup from '../../../src/application/useCases/Signup'
import UserRepositoryInMemory from '../../../src/infra/repositories/UserRepositoryInMemory'

describe('Signup', () => {
    const input = { username: 'any_user', password: 'any_password' }
    const userRepository = new UserRepositoryInMemory()
    const signup = new Signup(userRepository)
    it('cadaster new user', async () => {
        await signup.execute(input)
        const { users } = userRepository
        expect(users).toHaveLength(1)
        expect(users[0].username).toBe('any_user')
    })
    it('should not cadaster user existing', async () => {
        expect(() => signup.execute(input)).rejects.toThrow('user already exists')
    })
})

