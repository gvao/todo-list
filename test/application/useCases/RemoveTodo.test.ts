import { describe, expect, it } from 'vitest';
import Todo from "../../../src/core/domain/Todo";
import TodoRepositoryInMemory from "../../../src/core/infra/repositories/TodoRepositoryInMemory";
import RemoveTodo from "../../../src/core/application/useCases/RemoveTodo";

describe('RemoveTodo', () => {
    it('should return todos', () => {
        const repository = new TodoRepositoryInMemory()
        const removeTodo = new RemoveTodo(repository)
        const todo = Todo.create('any_title')
        repository.save(todo)
        expect(repository.getAll()).toHaveLength(1)
        removeTodo.execute(todo.id)
        expect(repository.getAll()).toHaveLength(0)
    })
})