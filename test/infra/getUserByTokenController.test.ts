import { beforeAll, describe, expect, it } from "vitest"
import { Request, Response, StatusInterface } from "../../src/shared/infra/types"
import GetUserByTokenController from '../../src/authContext/infra/controllers/GetUserByTokenController'
import TokenGenerate from "../../src/authContext/domain/service/TokenGenerate"
import UserRepositoryInMemory from "../../src/authContext/infra/repositories/UserRepositoryInMemory"
import User from "../../src/authContext/domain/User"
import GetUserByToken from "../../src/authContext/application/useCases/GetUserByToken"

describe('GetUserByTokenController', () => {
    const tokenGenerate = new TokenGenerate('secret')
    const username = 'any_username'
    const token = tokenGenerate.generate(username)
    const userRepository = new UserRepositoryInMemory()

    beforeAll(async () => {
        const user = User.create({ username, password: 'any_password' })
        await userRepository.save(user)
    })

    it('Return User ', async () => {
        const req: Partial<Request> = { headers: { authorization: `Bearer ${token}` } }
        const res: StatusInterface = {
            status: function (status: number): { json: (data?: any) => void } {
                return {
                    json: (data?: any) => {
                        expect(status).toBe(200)
                        expect(data.user.username).toBe('any_username')
                    }
                }
            }
        }
        const getUserByToken = new GetUserByToken(tokenGenerate, userRepository)
        const getUserByTokenController = new GetUserByTokenController(getUserByToken)
        const route = getUserByTokenController.controller()
        await route.handler(req, res)
    })
})