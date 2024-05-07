const todoGateway = new TodoGateway()
const todoController = new TodoController()

async function updateTodoList(input) {
    const todos = await todoGateway.getAll(input)
    todoController.render(todos)
}

todoController.on(async (args) => {
    const { type, input, id, status } = args
    
    if (type === 'search') return updateTodoList(input)
    if (type === 'remove') {
        todoGateway.deleteTodo(id)
        updateTodoList()
        return 
    }
    if (type == 'submit') {
        await todoGateway.addTodo(input)
        updateTodoList()
        return
    }
    if (type == 'checked') {
        await todoGateway.changeStatus(id, status)
        updateTodoList()
        return
    }

})

updateTodoList()