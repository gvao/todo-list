import { beforeEach, describe, expect, it } from "vitest";

import TodoRepositoryInMemory from "../../../src/core/infra/repositories/TodoRepositoryInMemory";
import AddTodo from '../../../src/core/application/useCases/AddTodo.js'
import Repository from "../../../src/core/application/Repository.interface";
import Todo from "../../../src/core/domain/Todo";

describe('AddTodo', () => {
    let repository: Repository<Todo>
    let addTodo: AddTodo

    beforeEach(() => {
        repository = new TodoRepositoryInMemory()
        addTodo = new AddTodo(repository)
    })

    it('add new Todo', () => {
        addTodo.execute('any_title')
        expect(repository.getAll()).toHaveLength(1)
        addTodo.execute('any_title')
        expect(repository.getAll()).toHaveLength(2)
    })
})