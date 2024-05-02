import { equal, strictEqual } from 'node:assert'
import { Server } from 'node:http'
import { after, before, describe, it } from 'node:test'
import Todo from '../src/core/domain/Todo.js'

describe('app', () => {

    const PORT = 3333
    /**@type {Server<typeof IncomingMessage, typeof ServerResponse>} */
    let _server
    /** @type {Todo[]} */
    const fakeTodos = []
    
    before(async () => {
        const { app } = await (import('../src/app.js'))
        _server = app.listen(PORT, () => console.log('server start!'))
        await new Promise(resolve => _server.on('listening', resolve))
    })

    it('should POST "/api/todos"', async () => {
        const url = `http://localhost:${PORT}/api/todos`
        const responses = [
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: 'any_title' })
            }),
            fetch(url, {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify({ title: 'outer_title' })
           })

        ]
        const [ response ] = await Promise.all(responses)

        equal(response.status, 201)
        equal(response.ok, true)
    })

    describe('GET', function () {
        it('#/api/todos return all todos ', async () => {
            const url = `http://localhost:${PORT}/api/todos`
            const response = await fetch(url)
            equal(response.ok, true)
            equal(response.status, 200)
            const todoList = await response.json()
            strictEqual(todoList.length, 2)
            fakeTodos.push(...todoList)
        })

        it('#/api/todos?search={parameter} return todo list filtered ', async () => {
            const url = `http://localhost:${PORT}/api/todos?search=outer`
            const response = await fetch(url)
            const todos = await response.json()
            const todoExpected = todos.find(todo => todo.title.includes('outer'))

            strictEqual(todos.length, 1)
            strictEqual(todoExpected.title, 'outer_title')
        })

        it('#/api/todos?search={parameter} parameter not found ', async () => {
            const url = `http://localhost:${PORT}/api/todos?search=not_found`
            const response = await fetch(url)
            const todos = await response.json()
            strictEqual(todos.length, 0)
        })

    })

    it('DELETE "/api/todos/:id"',async () => {
        const [firstTodo] = fakeTodos
        const url = `http://localhost:${PORT}/api/todos/${firstTodo.id}`
        const response = await fetch(url, { method: "DELETE" })
        strictEqual(response.status, 201)
    })

    after(done => _server.close(() => console.log(`close server!`)))
})