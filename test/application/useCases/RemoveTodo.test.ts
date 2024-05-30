import { describe, expect, it } from 'vitest';
import Todo from "../../../src/todoContext/domain/entity/Todo";
import TodoRepositoryInMemory from "../../../src/todoContext/infra/repositories/TodoRepositoryInMemory";
import RemoveTodo from "../../../src/todoContext/application/useCases/RemoveTodo";

describe('RemoveTodo', () => {
    it('should return todos', async () => {
        const repository = new TodoRepositoryInMemory()
        const removeTodo = new RemoveTodo(repository)
        const title = 'any_title'
        const todo = Todo.create({ title })
        await repository.save(todo)
        expect(await repository.getAll()).toHaveLength(1)
        await removeTodo.execute(todo.id)
        expect(await repository.getAll()).toHaveLength(0)
    })
})