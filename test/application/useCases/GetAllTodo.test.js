import { describe, it } from "node:test";
import { strictEqual } from 'node:assert'
import GetAllTodo from "../../../src/core/application/useCases/GetAllTodo.js";
import Repository from "../../../src/core/application/Repository.interface.js";
import Todo from "../../../src/core/domain/Todo.js";
import TodoRepositoryInMemory from "../../../src/core/infra/TodoRepositoryInMemory.js";

describe('GetAllTodo', () => {
    it('should return todos', () => {
        const repository = new TodoRepositoryInMemory()
        const getAllTodo = new GetAllTodo(repository)
        const todo = Todo.create('any_title')
        repository.save(todo)
        const todos = getAllTodo.execute()
        strictEqual(todos.length, 1)
    })
})

class todoRepository extends Repository {
    todos = []
    getAll() {
        return this.todos
    }

    /** @param {Todo} todo  */
    save(todo) {
        this.todos.push(todo)
    }
}