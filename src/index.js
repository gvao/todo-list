import path from 'node:path'

import AddTodo from "./core/application/useCases/AddTodo.js";
import GetAllTodo from "./core/application/useCases/GetAllTodo.js";
import Route from "./core/domain/Route.js";
import Routes from "./core/domain/Routes.js";
import TodoRepositoryInMemory from "./core/infra/TodoRepositoryInMemory.js";
import Server from './core/domain/Server.js';

const todoRepository = new TodoRepositoryInMemory()
const getAllTodo = new GetAllTodo(todoRepository)
const addTodo = new AddTodo(todoRepository)
const routes = new Routes()

const PORT = process.env.PORT || 3000
const publicPath = path.join('src', 'public')

await routes.usePublic(publicPath)

const todoController = new Route('GET', '/api/todos', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    const todos = getAllTodo.execute()
    res.end(JSON.stringify(todos))
})

const addTodoController = new Route('POST', '/api/todos', (req, res) => {
    const chunks = []
    req.on('data', chunk => {
        chunks.push(chunk)
    })

    req.on('end', () => {
        const result = Buffer.concat(chunks).toString()
        const body = JSON.parse(result)

        addTodo.execute(body.title)
        res.writeHead(201, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ message: `Todo created!` }))
    })
})

routes.addRoute(todoController)
routes.addRoute(addTodoController)

const app = new Server(routes)

export const server = app.server.listen(PORT, async () => {
    console.log(`listening on http://localhost:${PORT}`)
})

