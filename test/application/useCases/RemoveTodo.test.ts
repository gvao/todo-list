import { describe, expect, it } from 'vitest';
import Todo from "../../../src/todoContext/domain/entity/Todo";
import TodoRepositoryInMemory from "../../../src/todoContext/infra/repositories/TodoRepositoryInMemory";
import RemoveTodo from "../../../src/todoContext/application/useCases/RemoveTodo";

describe('RemoveTodo', () => {
    it('should return todos',async () => {
        const repository = new TodoRepositoryInMemory()
        const removeTodo = new RemoveTodo(repository)
        const todo = Todo.create('any_title')
        await repository.save(todo)
        expect(await repository.getAll()).toHaveLength(1)
        await removeTodo.execute(todo.id)
        expect(await repository.getAll()).toHaveLength(0)
    })
})