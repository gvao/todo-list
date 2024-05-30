import { beforeEach, describe, expect, it } from "vitest";

import TodoRepositoryInMemory from "../../../src/todoContext/infra/repositories/TodoRepositoryInMemory";
import AddTodo from '../../../src/todoContext/application/useCases/AddTodo'
import Repository from "../../../src/shared/Repository.interface";
import Todo from "../../../src/todoContext/domain/entity/Todo";

describe('AddTodo', () => {
    let repository: Repository<Todo>
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