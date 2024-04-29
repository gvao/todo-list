import { beforeEach, describe, it } from "node:test";
import assert from "node:assert";
import TodoRepositoryInMemory from "../../../src/core/infra/TodoRepositoryInMemory.js";
import AddTodo from '../../../src/core/application/useCases/AddTodo.js'
import Repository from "../../../src/core/application/Repository.interface.js";

describe('AddTodo', () => {
    /** @type {Repository} */
    let repository
    /**@type { AddTodo} */
    let addTodo

    beforeEach(() => {
        repository = new TodoRepositoryInMemory()
        addTodo = new AddTodo(repository)
    })

    it('add new Todo', () => {
        addTodo.execute('any_title')
        assert.equal(repository.getAll().length, 1)
        addTodo.execute('any_title')
        assert.equal(repository.getAll().length, 2)
    })
})