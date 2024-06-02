import { beforeAll, describe, expect, it } from "vitest"
import { Request, StatusInterface } from "../../../src/shared/infra/types"

import User from "../../../src/authContext/domain/User"
import TokenGenerate from "../../../src/authContext/domain/service/TokenGenerate"
import UserRepositoryInMemory from "../../../src/authContext/infra/repositories/UserRepositoryInMemory"
import GetTodoListById from '../../../src/todoContext/application/useCases/GetTodoListById'
import UserTodoRepositoryInMemory from '../../../src/todoContext/infra/repositories/UserTodoRepositoryInMemory'
import GetTodoListByIdController from '../../../src/todoContext/infra/controllers/GetTodoListByIdController'
import UserTodo from "../../../src/todoContext/domain/entity/UserTodo"

describe('GetUserByTokenController', () => {
    const userTodoRepository = new UserTodoRepositoryInMemory()
    const getUserByToken = new GetTodoListById(userTodoRepository)
    const getTodoListByIdController = new GetTodoListByIdController(getUserByToken)
    const tokenGenerate = new TokenGenerate('secret')

    const username = 'any_username'
    const token = tokenGenerate.generate(username)
    const user = User.create({ username, password: 'any_password' })

    beforeAll(async () => {
        const userTodo = UserTodo.create({ title: 'any_title', userId: user.id })
        await userTodoRepository.save(userTodo)
    })

    it('Return todo list by user', async () => {
        const req: Partial<Request> = {
            method: "GET",
            headers: { authorization: `Bearer ${token}` },
            body: { id: user.id }
        }
        const res: StatusInterface = {
            status: (status: number): { json: (data?: any) => void } => {
                expect(status).toBe(200)
                return {
                    json: (data?: any) => {
                        expect(data.todoList).toHaveLength(1)
                    }
                }
            }
        }
        const route = getTodoListByIdController.controller()
        await route.handler(req, res)
    })
})