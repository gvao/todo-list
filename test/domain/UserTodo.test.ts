import { describe, expect, it } from "vitest";
import UserTodo from "../../src/todoContext/domain/entity/UserTodo"

describe('UserTodo', () => {
    it('created UserTodo', async () => {
        const input = { title: 'any_title', userId: 'user_id' }
        const userTodo = UserTodo.create(input)
        expect(userTodo.userId).toBe(input.userId)
        expect(userTodo.createdAt).toBeInstanceOf(Date)
    })
})