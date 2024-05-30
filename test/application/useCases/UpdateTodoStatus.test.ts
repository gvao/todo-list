import UpdateTodoStatus from '../../../src/todoContext/application/useCases/UpdateTodoStatus'
import TodoRepositoryInMemory from '../../../src/todoContext/infra/repositories/TodoRepositoryInMemory'
import Todo from '../../../src/todoContext/domain/entity/Todo'
import { GetByIdRepository, SaveRepository } from '../../../src/shared/Repository.interface'
import { beforeAll, describe, expect, it } from 'vitest'

describe('ChangeStatusTodo', function () {
    let fakeTodo: Todo
    let repository: SaveRepository<Todo> & GetByIdRepository<Todo>
    let updateTodoStatus: UpdateTodoStatus

    beforeAll(() => {
        const title = 'any_title'
        fakeTodo = Todo.create({ title })
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