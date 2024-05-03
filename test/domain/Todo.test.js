import { describe, it } from "node:test";
import { strictEqual, deepEqual } from "node:assert/strict"
import Todo from "../../src/core/domain/Todo.js";

describe('Todo', () => {
    it('should create a new Todo', () => {
        const todo = Todo.create('any_title')
        strictEqual(todo.title, 'any_title')
    })

    it('should change status todo', () => {
        const todo = Todo.create('any_title')
        todo.done()
        strictEqual(todo.isDone, true)
    })

    it('should return dto', () => {
        const todo = Todo.create('any_title')
        const { id, ...dto } = todo.dto
        deepEqual(dto, {
            title: 'any_title',
            isDone: false,
        })
    })

})