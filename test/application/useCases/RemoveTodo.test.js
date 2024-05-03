import { describe, it } from "node:test";
import { strictEqual } from 'node:assert'
import Todo from "../../../src/core/domain/Todo.js";
import TodoRepositoryInMemory from "../../../src/core/infra/TodoRepositoryInMemory.js";
import RemoveTodo from "../../../src/core/application/useCases/RemoveTodo.js";

describe('RemoveTodo', () => {
    it('should return todos', () => {
        const repository = new TodoRepositoryInMemory()
        const removeTodo = new RemoveTodo(repository)
        const todo = Todo.create('any_title')
        repository.save(todo)
        strictEqual(repository.getAll().length, 1)
        const todos = removeTodo.execute(todo.id)
        strictEqual(repository.getAll().length, 0)
    })
})