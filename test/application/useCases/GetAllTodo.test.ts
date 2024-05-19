import GetAllTodo from "../../../src/application/useCases/GetAllTodo";
import Todo from "../../../src/domain/entity/Todo";
import TodoRepositoryInMemory from "../../../src/infra/repositories/TodoRepositoryInMemory";
import { describe, expect, it } from 'vitest';

describe('GetAllTodo', () => {
    it('should return todos', () => {
        const repository = new TodoRepositoryInMemory()
        const getAllTodo = new GetAllTodo(repository)
        const todo = Todo.create('any_title')
        repository.save(todo)
        const todoList = getAllTodo.execute()
        expect(todoList).toHaveLength(1)
    })
})
