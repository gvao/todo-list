const todoGateway = new TodoGateway()
const todoController = new TodoController()

async function updateTodoList(input) {
    const todoList = await todoGateway.getAll(input)
    todoController.render(todoList)
}

todoController.on(async (args) => {
    const { type, input, id, status } = args
    
    if (type === 'search') {
        return updateTodoList(input)
    }
    if (type === 'remove') {
        todoGateway.deleteTodo(id)
        return updateTodoList()
    }
    if (type == 'submit') {
        await todoGateway.addTodo(input)
        return updateTodoList()
    }
    if (type == 'checked') {
        await todoGateway.changeStatus(id, status)
        return updateTodoList()
    }

})

updateTodoList()