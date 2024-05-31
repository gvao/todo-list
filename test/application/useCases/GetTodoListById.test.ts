import { beforeAll, describe, expect, it } from 'vitest'
import UserRepositoryInMemory from "../../../src/authContext/infra/repositories/UserRepositoryInMemory"
import GetTodoListById from '../../../src/shared/application/GetTodoListById'
import TokenGenerate from '../../../src/authContext/domain/service/TokenGenerate'
import User from '../../../src/authContext/domain/User'
import UserTodoRepositoryInMemory from '../../../src/todoContext/infra/repositories/UserTodoRepositoryInMemory'
import UserTodo from '../../../src/todoContext/domain/entity/UserTodo'

describe('GetTodoListById', () => {
    const tokenGenerate = new TokenGenerate('secret')
    const userRepository = new UserRepositoryInMemory()
    const userTodoRepository = new UserTodoRepositoryInMemory()
    const getTodoListById = new GetTodoListById( tokenGenerate, userRepository, userTodoRepository)
    const inputUser = { username: 'any_username', password: 'any_password'}
    const user = User.create(inputUser)
    beforeAll(async () => {
        const outerUser = User.create({...inputUser, username: 'any_outer_username',})
        const userTodo = UserTodo.create({ title: 'any_title', userId: user.id })
        const outerUserTodo = UserTodo.create({ title: 'any_title', userId: outerUser.id })
        await userRepository.save(user)
        await userTodoRepository.save(userTodo)
        await userTodoRepository.save(outerUserTodo)
    })
    it('should return a list of tasks user by token', async () => {
        const token = tokenGenerate.generate(user.username)
        const todoList = await getTodoListById.execute(token)
        expect(todoList).toHaveLength(1)
    })
})

