import { beforeAll, describe, expect, it } from "vitest"
import { Request, StatusInterface } from "../../../src/shared/infra/types"

import User from "../../../src/authContext/domain/User"
import TokenGenerate from "../../../src/authContext/domain/service/TokenGenerate"
import UserRepositoryInMemory from "../../../src/authContext/infra/repositories/UserRepositoryInMemory"
import GetTodoListById from '../../../src/todoContext/application/useCases/GetTodoListById'
import UserTodoRepository from '../../../src/todoContext/infra/repositories/UserTodoRepositoryInMemory'
import GetTodoListByIdController from '../../../src/todoContext/infra/controllers/GetTodoListByIdController'
import UserTodo from "../../../src/todoContext/domain/entity/UserTodo"

describe('GetUserByTokenController', () => {
    const username = 'any_username'
    const tokenGenerate = new TokenGenerate('secret')
    const token = tokenGenerate.generate(username)
    const userRepository = new UserRepositoryInMemory()
    const userTodoRepository = new UserTodoRepository()
    const getUserByToken = new GetTodoListById(tokenGenerate, userRepository, userTodoRepository)
    const getTodoListByIdController = new GetTodoListByIdController(getUserByToken)

    beforeAll(async () => {
        const user = User.create({ username, password: 'any_password' })
        const userTodo = UserTodo.create({ title: 'any_title', userId: user.id })
        await userRepository.save(user)
        await userTodoRepository.save(userTodo)
    })

    it('Return todo list by user', async () => {
        const req: Partial<Request> = { headers: { authorization: `Bearer ${token}` } }
        const res: StatusInterface = {
            status: (status: number): { json: (data?: any) => void } => {
                expect(status).toBe(200)
                return {
                    json: (data?: any) => { expect(data.todoList).toHaveLength(1) }
                }
            }
        }
        const route = getTodoListByIdController.controller()
        await route.handler(req, res)
    })
})