import { describe, it, before } from 'node:test'
import { strictEqual } from 'node:assert/strict'
import UpdateTodoStatus from '../../../src/core/application/useCases/UpdateTodoStatus.js'
import TodoRepositoryInMemory from '../../../src/core/infra/TodoRepositoryInMemory.js'
import Todo from '../../../src/core/domain/Todo.js'

describe('ChangeStatusTodo', function () {
    /**@type {Todo} */
    let fakeTodo
    /**@type {TodoRepositoryInMemory} */
    let repository
    /**@type {UpdateTodoStatus} */
    let updateTodoStatus

    before(() => {
        fakeTodo = Todo.create('any_title')
        strictEqual(fakeTodo.isDone, false)
        repository = new TodoRepositoryInMemory()
        repository.save(fakeTodo)
        updateTodoStatus = new UpdateTodoStatus(repository)
    })
    it('change todo status', () => {
        updateTodoStatus.execute(fakeTodo.id, true)
        const todo = repository.getById(fakeTodo.id)
        strictEqual(todo.isDone, true)
    })
})