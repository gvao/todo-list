import { beforeEach, describe, expect, it } from "vitest";

import TodoRepositoryInMemory from "../../../src/todoContext/infra/repositories/TodoRepositoryInMemory";
import AddTodo from '../../../src/todoContext/application/useCases/AddTodo'
import Todo from "../../../src/todoContext/domain/entity/Todo";
import { GetAllRepository, SaveRepository } from "../../../src/shared/Repository.interface";

describe('AddTodo', () => {
    let repository: SaveRepository<Todo> & GetAllRepository<Todo>
    let addTodo: AddTodo

    beforeEach(() => {
        repository = new TodoRepositoryInMemory()
        addTodo = new AddTodo(repository)
    })

    it('add new Todo', async () => {
        await addTodo.execute('any_title')
        expect(await repository.getAll()).toHaveLength(1)
        await addTodo.execute('any_title')
        expect(await repository.getAll()).toHaveLength(2)
    })
})