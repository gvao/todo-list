import UpdateTodoStatus from '../../../src/application/useCases/UpdateTodoStatus'
import TodoRepositoryInMemory from '../../../src/infra/repositories/TodoRepositoryInMemory'
import Todo from '../../../src/domain/entity/Todo'
import { beforeAll, describe, expect, it } from 'vitest'
import { GetByIdRepository, SaveRepository } from '../../../src/application/Repository.interface'

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
    it('change todo status', async () => {
        updateTodoStatus.execute(fakeTodo.id, true)
        const todo = await repository.getById(fakeTodo.id)
        expect(todo!.isDone).toBeTruthy()
    })
})