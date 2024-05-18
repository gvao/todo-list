import { beforeEach, describe, expect, it } from "vitest";

import TodoRepositoryInMemory from "../../../src/infra/repositories/TodoRepositoryInMemory";
import AddTodo from '../../../src/application/useCases/AddTodo'
import Repository from "../../../src/application/Repository.interface";
import Todo from "../../../src/domain/entity/Todo";

describe('AddTodo', () => {
    let repository: Repository<Todo>
    let addTodo: AddTodo

    beforeEach(() => {
        repository = new TodoRepositoryInMemory()
        addTodo = new AddTodo(repository)
    })

    it('add new Todo', async () => {
        addTodo.execute('any_title')
        expect(await repository.getAll()).toHaveLength(1)
        addTodo.execute('any_title')
        expect(await repository.getAll()).toHaveLength(2)
    })
})