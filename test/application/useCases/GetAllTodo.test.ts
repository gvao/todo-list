import GetAllTodo from "../../../src/todoContext/application/useCases/GetAllTodo";
import Todo from "../../../src/todoContext/domain/entity/Todo";
import TodoRepositoryInMemory from "../../../src/todoContext/infra/repositories/TodoRepositoryInMemory";
import { describe, expect, it } from 'vitest';

describe('GetAllTodo', () => {
    it('should return todos', async () => {
        const repository = new TodoRepositoryInMemory()
        const getAllTodo = new GetAllTodo(repository)
        const title = 'any_title'
        const todo = Todo.create({ title })
        await repository.save(todo)
        const todoList = await getAllTodo.execute()
        expect(todoList).toHaveLength(1)
    })
})
