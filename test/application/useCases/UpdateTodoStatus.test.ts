import UpdateTodoStatus from '../../../src/core/application/useCases/UpdateTodoStatus'
import TodoRepositoryInMemory from '../../../src/core/infra/repositories/TodoRepositoryInMemory'
import Todo from '../../../src/core/domain/entity/Todo'
import { beforeAll, describe, expect, it } from 'vitest'
import { GetByIdRepository, SaveRepository } from '../../../src/core/application/Repository.interface'

describe('ChangeStatusTodo', function () {
    let fakeTodo: Todo
    let repository: SaveRepository<Todo> & GetByIdRepository<Todo>
    let updateTodoStatus: UpdateTodoStatus

    beforeAll(() => {
        fakeTodo = Todo.create('any_title')
        expect(fakeTodo.isDone).toBeFalsy()
        repository = new TodoRepositoryInMemory()
        repository.save(fakeTodo)
        updateTodoStatus = new UpdateTodoStatus(repository)
    })
    it('change todo status', () => {
        updateTodoStatus.execute(fakeTodo.id, true)
        const todo = repository.getById(fakeTodo.id)
        expect(todo!.isDone).toBeTruthy()
    })
})