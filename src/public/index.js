const todoController = new TodoController()

async function getTodos() {
    const response = await fetch('/api/todos')
    const json = await response.json()

    return json
}

async function addNewTodo(title) {
    const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ title })
    })

    return await response.json()
}

updateTodoList()

todoController.on(async ({ type, input }) => {
    if (type == 'submit') {
        const result = await addNewTodo(input)
        console.log(result)
        updateTodoList()
    }
    console.log(type, input)
})

function updateTodoList() {
    getTodos()
        .then(todoController.render)
        .catch(console.error)
}