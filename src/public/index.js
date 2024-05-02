const todoGateway = new TodoGateway()
const todoController = new TodoController()

async function updateTodoList(input) {
    const todos = await todoGateway.getAll(input)
    todoController.render(todos)
}

todoController.on(async ({ type, input }) => {
    console.log(type, input,)

    if (type == 'submit') {
        await todoGateway.addTodo(input)
        updateTodoList()
        return
    }

    if (type === 'search') {
        updateTodoList(input)
    }
})

updateTodoList()