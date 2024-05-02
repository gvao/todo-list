const todoGateway = new TodoGateway()
const todoController = new TodoController()

async function updateTodoList(input) {
    const todos = await todoGateway.getAll(input)
    todoController.render(todos)
}

todoController.on(async ({ type, input, id }) => {
    console.log(type, input, id)
    
    if (type === 'search') return updateTodoList(input)
    if (type === 'remove') return todoGateway.deleteTodo(id)
    if (type == 'submit') {
        await todoGateway.addTodo(input)
        updateTodoList()
        return
    }

})

updateTodoList()