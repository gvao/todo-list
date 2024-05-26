import { describe, expect, it } from "vitest"
import LoginController from '../../src/infra/controllers/LoginController'
import Login from "../../src/application/useCases/Login"
import UserRepositoryInMemory from "../../src/infra/repositories/UserRepositoryInMemory"
import TokenGenerate from "../../src/domain/service/TokenGenerate"
import Route from "../../src/infra/Route"

describe('LoginController', () => {
    const userRepository = new UserRepositoryInMemory()
    const tokenGenerate = new TokenGenerate('secret')
    const login = new Login(userRepository, tokenGenerate)
    const loginController = new LoginController(login)
    const route = loginController.controller()
    it('return route', async () => {
        expect(route).toBeInstanceOf(Route)
    })

    it('invalid parameters', async () => {
        const req = {
            body: { username: 'invalid_username', password: 'invalid_password' }
        }
        const res = {
            status: (status: number) => {
                return {
                    json(data: any) {
                        expect(status).toBe(400)
                        expect(data.message).toBe('failed authentication')
                    }
                }
            }
        }
        await route.handler(req, res)
    })
})