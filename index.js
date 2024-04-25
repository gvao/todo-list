import AddTodo from "./src/core/application/useCases/AddTodo.js";
import GetFilteredTodosByTitle from "./src/core/application/useCases/GetFilteredTodosByTitle.js";
import RemoveTodo from "./src/core/application/useCases/RemoveTodo.js";
import UpdateTodoStatus from "./src/core/application/useCases/UpdateTodoStatus.js";
import TodoController from "./src/core/infra/TodoController.js";
import TodoRepositoryInMemory from "./src/core/infra/TodoRepositoryInMemory.js";

const todoRepository = new TodoRepositoryInMemory()

const controller = new TodoController()
const addTodo = new AddTodo(todoRepository)
const updateTodoStatus = new UpdateTodoStatus(todoRepository)
const removeTodo = new RemoveTodo(todoRepository)
const getFilteredTodosByTitle = new GetFilteredTodosByTitle(todoRepository)

controller.handleSubmit(title => {addTodo.execute(title)})

controller.on(({ type, id, status, input }) => {
    if (type === 'checked') updateTodoStatus.execute(id, status)
    if (type === 'remove') removeTodo.execute(id)
    if (type === 'search') {
        const todosFiltered = getFilteredTodosByTitle.execute(input);
        controller.render(todosFiltered)
    }
})

todoRepository.on(controller.render)
todoRepository.notify()
