import Todo from "../../src/todoContext/domain/entity/Todo";
import { describe, it, expect } from "vitest";

describe('Todo', () => {
    const title = 'any_title'
    it('should create a new Todo', () => {
        const todo = Todo.create({ title })
        expect(todo.title).toBe('any_title')
    })

    it('should change status todo', () => {
        const todo = Todo.create({ title })
        todo.done()
        expect(todo.isDone).toBeTruthy()
    })

    it('should return dto', () => {
        const todo = Todo.create({ title })
        const { id, ...dto } = todo.dto
        expect(dto).toEqual({
            title,
            isDone: false,
        })
    })

})