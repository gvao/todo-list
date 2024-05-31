import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import { IncomingMessage, Server, ServerResponse } from 'http'
import Todo from '../src/todoContext/domain/entity/Todo'

describe('app', () => {

    const PORT = 3333
    let _server: Server<typeof IncomingMessage, typeof ServerResponse>
    const fakeTodoList: Todo[] = []
    const URL_BASE = `http://localhost:${PORT}`

    beforeAll(async () => {
        const { app } = await (import('../src/app'))
        _server = app.listen(PORT, () => console.log('server start!'))
        await new Promise(resolve => _server!.on('listening', resolve))
    })

    describe('#todoList', () => {
        it('should POST "/api/todos"', async () => {
            const url = `${URL_BASE}/api/todos`
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
            const [response] = await Promise.all(responses)

            expect(response.status).toBe(201)
            expect(response.ok).toBeTruthy()
        })

        describe('GET', function () {
            it('#/api/todos return all todos ', async () => {
                const url = `${URL_BASE}/api/todos`
                const response = await fetch(url)
                expect(response.ok).toBeTruthy()
                expect(response.status).toBe(200)
                const todoList = (await response.json()) as Todo[]
                expect(todoList).toHaveLength(2)
                fakeTodoList.push(...todoList)
            })

            it('#/api/todos?search={parameter} return todo list filtered ', async () => {
                const url = `http://localhost:${PORT}/api/todos?search=outer`
                const response = await fetch(url)
                const todos = await response.json()
                const todoExpected = todos.find(todo => todo.title.includes('outer'))

                expect(todos).toHaveLength(1)
                expect(todoExpected.title).toBe('outer_title')
            })

            it('#/api/todos?search={parameter} parameter not found ', async () => {
                const url = `http://localhost:${PORT}/api/todos?search=not_found`
                const response = await fetch(url)
                const todos = await response.json()
                expect(todos).toHaveLength(0)
            })

        })

        it('POST "/api/todos/:id/changeStatus" update isDone property by Todo', async () => {
            const [firstTodo] = fakeTodoList
            const url = `${URL_BASE}/api/todos/${firstTodo.id}/changeStatus`
            const result = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({ status: true }),
                headers: { 'Content-Type': 'application/json' }
            })
            expect(result.status).toBe(201)

            const response = await fetch(`${URL_BASE}/api/todos`)
            const todos = (await response.json()) as Todo[]
            const todo = todos.find(todo => todo.id === firstTodo.id)
            expect(todo!.isDone).toBeTruthy()

        })

        it('DELETE "/api/todos/:id"', async () => {
            const [firstTodo, secondsTodo] = fakeTodoList
            const url = `http://localhost:${PORT}/api/todos/${firstTodo.id}`
            const responseFirst = await fetch(url, { method: "DELETE" })
            const responseSecond = await fetch(`${URL_BASE}/api/todos/${secondsTodo.id}`, { method: "DELETE" })
            expect(responseFirst.status).toBe(201)
            expect(responseSecond.status).toBe(201)
            const responseGet = await fetch(`${URL_BASE}/api/todos`)
            const todoList = await responseGet.json()
            expect(todoList).toHaveLength(0)

        })
    })

    describe('User', () => {
        const userInput = { username: 'john Doe', password: 'any_password' }
        let fakeToken: string
        it('should create a new user', async () => {
            const url = `${URL_BASE}/api/signup`
            const result = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(userInput),
                headers: { 'Content-Type': 'application/json' }
            })
            expect(result.status).toBe(201)
        })
        it('should return access token', async () => {
            const url = `${URL_BASE}/api/login`
            const result = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(userInput),
                headers: { 'Content-Type': 'application/json' }
            })
            const { token } = await result.json()
            fakeToken = token
            expect(result.status).toBe(200)
            expect(token).toBe('eyJhbGciOiJIUzI1NiJ9.am9obiBEb2U.nZDyx3KAkZpF-CpiSrXCTQeLx33GM_k8tOIFpjB2u-8')
        })
        it('should return user', async () => {
            const url = `${URL_BASE}/api/user`
            const result = await fetch(url, {
                method: 'GET',
                headers: { 'authorization': `Bearer ${fakeToken}` }
            })
            expect(result.status).toBe(200)
            const { user } = await result.json()
            expect(user.username).toBe('john Doe')
        })

        it.skip('should create a new todo to user', async () => {
            const url = `${URL_BASE}/api/users/todo`
            const result = await fetch(url, {
                method: 'POST',
                headers: { 'authorization': `Bearer ${fakeToken}` }
            })
            expect(result.status).toBe(200)
            const { todoList } = await result.json()
            expect(todoList).toHaveLength(1)
            console.log(todoList)
        })
        it('should return todo list by user', async () => {
            const url = `${URL_BASE}/api/users/todo`
            const result = await fetch(url, {
                method: 'GET',
                headers: { 'authorization': `Bearer ${fakeToken}` }
            })
            expect(result.status).toBe(200)
            const { todoList } = await result.json()
            expect(todoList).toHaveLength(1)
            console.log(todoList)
        })

    })

    afterAll(done => { _server!.close(() => console.log(`closed test server`)) })
})