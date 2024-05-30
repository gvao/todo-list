import { beforeEach, describe, expect, it } from 'vitest'
import SigUpController from '../../src/authContext/infra/controllers/SigUpController'
import Route from '../../src/shared/domain/Route'
import Signup from '../../src/authContext/application/useCases/Signup'
import UserRepositoryInMemory from '../../src/authContext/infra/repositories/UserRepositoryInMemory'

describe('SigUpController', () => {
    const userRepository = new UserRepositoryInMemory()
    let signup: Signup
    let sigUpController: SigUpController
    let responseMock: { end: () => void, statusCode: number }

    beforeEach(() => {
        signup = new Signup(userRepository)
        sigUpController = new SigUpController(signup)
        responseMock = { end: () => { }, statusCode: 0 }
    })

    it('should cadaster new user in repository', async () => {
        const body = { username: 'any_username', password: 'any_password' }
        const route = sigUpController.controller()
        expect(route).toBeInstanceOf(Route)
        await route.handler({ body }, responseMock)
        expect(responseMock.statusCode).toBe(201)
        expect(userRepository.users).toHaveLength(1)
    })
    it('should return error if user existing', async () => {
        const body = { username: 'any_username', password: 'any_password' }
        const route = sigUpController.controller()
        await route.handler({ body }, responseMock)
        expect(responseMock.statusCode).toBe(304)
        expect(userRepository.users).toHaveLength(1)
    })
})