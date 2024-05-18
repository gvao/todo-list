import Todo from "../../src/core/domain/entity/Todo";
import { describe, it, expect } from "vitest";

describe('Todo', () => {
    it('should create a new Todo', () => {
        const todo = Todo.create('any_title')
        expect(todo.title).toBe('any_title')
    })

    it('should change status todo', () => {
        const todo = Todo.create('any_title')
        todo.done()
        expect(todo.isDone).toBeTruthy()
    })

    it('should return dto', () => {
        const todo = Todo.create('any_title')
        const { id, ...dto } = todo.dto
        expect(dto).toEqual({
            title: 'any_title',
            isDone: false,
        })
    })

})