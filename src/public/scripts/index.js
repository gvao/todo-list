const todoGateway = new TodoGateway()
const todoController = new TodoController()

async function updateTodoList(input) {
    const todos = await todoGateway.getAll(input)
    todoController.render(todos)
}

todoController.on(async (args) => {
    const { type, input, id } = args
    console.log(args)
    
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

})

updateTodoList()