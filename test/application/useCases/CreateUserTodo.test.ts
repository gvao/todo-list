import { beforeAll, describe, expect, it } from "vitest";
import UserTodoRepositoryInMemory from "../../../src/todoContext/infra/repositories/UserTodoRepositoryInMemory"
import UserTodo from "../../../src/todoContext/domain/entity/UserTodo";
import CreateUserTodo from "../../../src/todoContext/application/useCases/CreateUserTodo";

describe('CreateUserTodo', () => {
    const userTodoRepository = new UserTodoRepositoryInMemory()
    const createUserTodo = new CreateUserTodo(userTodoRepository)
    const userId = 'any_user_id'
    const input = { title: 'any_title', userId }

    it('should create a user todo', async () => {
        await createUserTodo.execute(input)
        const userTodo = await userTodoRepository.getUserTodoById(userId)
        expect(userTodo).toHaveLength(1)
    })
})