import { afterAll, beforeAll, describe, it, expect, beforeEach, test } from 'vitest'
import { IncomingMessage, Server, ServerResponse } from 'http'
import Todo from '../src/todoContext/domain/entity/Todo'

describe('app', () => {

    const PORT = 3333
    let _server: Server<typeof IncomingMessage, typeof ServerResponse>
    const URL_BASE = `http://localhost:${PORT}`

    beforeAll(async () => {
        const { app } = await (import('../src/app'))
        _server = app.listen(PORT, () => console.log('server start!'))
        await new Promise(resolve => _server!.on('listening', resolve))
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
        });

        it('should return error with invalid token', async () => {
            const url = `${URL_BASE}/api/user`
            const response = await fetch(url, {
                method: 'GET',
                headers: { 'authorization': `Bearer invalid_token` }
            })
            expect(response.status).toBe(404)
            const { message } = await response.json()
            expect(message).toBe('authentication failed')
        })


        describe('#todo', () => {
            let options: RequestInit
            const fakeUserTodoList: Todo[] = []

            beforeEach(() => {
                options = {
                    method: 'GET',
                    headers: { 'authorization': `Bearer ${fakeToken}` }
                }
            })

            it('should create a new todo to user', async () => {
                const titles = ['any_title', 'outer_title']
                for (const title of titles) {
                    const url = `${URL_BASE}/api/user/todo`
                    const result = await fetch(url, {
                        method: 'POST',
                        headers: { 'authorization': `Bearer ${fakeToken}`, 'Content-Type': "application/json" },
                        body: JSON.stringify({ title })
                    })
                    expect(result.status).toBe(201)
                    const { message } = await result.json()
                    expect(message).toBe('Todo created!')
                }
            })

            it('should return todo list by user', async () => {
                const url = `${URL_BASE}/api/user/todo`
                const result = await fetch(url, options)
                expect(result.status).toBe(200)
                const { todoList } = await result.json()
                expect(todoList).toHaveLength(2)
                fakeUserTodoList.push(...todoList)
            })

            it('#/api/todos?search={parameter} return todo list filtered ', async () => {
                const url = `${URL_BASE}/api/user/todo?search=outer`
                const response = await fetch(url, options)
                const { todoList } = await response.json()
                expect(todoList).toHaveLength(1)
                const todoExpected = todoList.find(todo => todo.title.includes('outer'))
                expect(todoExpected!.title).toBe('outer_title')
            })

            it('#/api/todos?search={parameter} parameter not found ', async () => {
                const url = `http://localhost:${PORT}/api/user/todo?search=not_found`
                const response = await fetch(url, options)
                const { todoList } = await response.json()
                expect(todoList).toHaveLength(0)
            })

            it('POST "/api/user/todo/:id/changeStatus" update isDone property by Todo', async () => {
                const [firstTodo] = fakeUserTodoList
                const url = `${URL_BASE}/api/user/todo/${firstTodo.id}/changeStatus`
                const result = await fetch(url, {
                    ...options,
                    method: 'POST',
                    body: JSON.stringify({ status: true }),
                    headers: { 'Content-Type': 'application/json', ...options.headers }
                })
                expect(result.status).toBe(201)

                const response = await fetch(`${URL_BASE}/api/user/todo`, options)
                const { todoList } = (await response.json())
                const todo = todoList.find(todo => todo.id === firstTodo.id)
                expect(todo!.isDone).toBeTruthy()

            })

            it('DELETE "/api/user/todo/:id"', async () => {
                const optionsDelete = { ...options, method: "DELETE" }
                for (const userTodo of fakeUserTodoList) {
                    const url = `${URL_BASE}/api/user/todo/${userTodo.id}`
                    const response = await fetch(url, optionsDelete)
                    expect(response.status).toBe(201)
                }
                await new Promise(resolve => setTimeout(resolve, 3000))
                const responseGet = await fetch(`${URL_BASE}/api/user/todo`, options)
                const { todoList } = await responseGet.json()
                expect(todoList).toHaveLength(0)
            })

        })

    })

    afterAll(done => { _server!.close(() => console.log(`closed test server`)) })
})