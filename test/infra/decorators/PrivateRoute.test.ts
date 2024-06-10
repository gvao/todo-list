import { beforeAll, describe, expect, it } from "vitest"
import PrivateRoute from "../../../src/shared/infra/decorators/PrivateRoute"
import TokenGenerate from "../../../src/authContext/domain/service/TokenGenerate"
import UserRepositoryInMemory from "../../../src/authContext/infra/repositories/UserRepositoryInMemory"
import Controller from "../../../src/todoContext/infra/controllers/interface"
import Route from "../../../src/shared/domain/Route"
import { Request, Response } from "../../../src/shared/infra/types"
import User from "../../../src/authContext/domain/User"

describe("PrivateRoute", () => {
    const tokenGenerate = new TokenGenerate('secret')
    const userRepository = new UserRepositoryInMemory()
    const sut = new PrivateRoute(tokenGenerate, userRepository)
    const input = { username: 'any_username', password: 'any_password' }
    const fakeToken = tokenGenerate.generate(input.username)
    const user = User.create(input)

    const anyController: Controller = {
        controller(controller) {
            return new Route('GET', '/api', (req, res, next) => {
                const { body } = req
                expect(body.id).toBe(user.id)
            })
        },
    }
    const route = sut.controller(anyController)

    beforeAll(async () => {
        await userRepository.save(user)
    })

    it('should create a new private route', () => {
        const request: Partial<Request> = {
            headers: {
                authorization: 'Bearer ' + fakeToken
            }
        }
        const response = {}
        route.handler(request, response)

    })

    it('return error with invalid token', () => {
        const invalidToken = tokenGenerate.generate('invalid_token')
        const request: Partial<Request> = {
            headers: {
                authorization: 'Bearer ' + invalidToken
            }
        }
        const response: Partial<Response> = {
            status: (status) => ({
                json(data) {
                    expect(status).toBe(404)
                    expect(data.message).toBe('authentication failed')
                },
            })
        }

        route.handler(request, response)
    })
    it('should return error with jwt invalid', () => {
        const request: Partial<Request> = {
            headers: {
                authorization: 'Bearer ' + 'invalid_token'
            }
        }
        const response: Partial<Response> = {
            status: (status) => ({
                json(data) {
                    expect(status).toBe(404)
                    expect(data.message).toBe('authentication failed')
                },
            })
        }
        route.handler(request, response)
    })
})