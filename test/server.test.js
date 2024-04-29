import { equal, strictEqual } from 'node:assert'
import { Server } from 'node:http'
import { after, before, describe, it } from 'node:test'

describe('server', () => {

    const PORT = 3333
    /**@type {Server<typeof IncomingMessage, typeof ServerResponse>} */
    let _server

    before(async () => {
        const { server } = await (import('../src/server.js'))
        _server = server.listen(PORT, () => console.log('server start!'))

        await new Promise(resolve => _server.on('listening', resolve))
    })

    it('should POST "/api/todos"', async () => {
        const url = `http://localhost:${PORT}/api/todos`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: 'any_title' })
        })
        equal(response.status, 201)
        equal(response.ok, true)
        const todos = await response.json()
    })

    it('should GET "/api/todos"', async () => {
        const url = `http://localhost:${PORT}/api/todos`
        const response = await fetch(url)
        equal(response.ok, true)
        equal(response.status, 200)

        console.log(await response.json())
    })


    after(done => _server.close(() => console.log(`close server!`)))
})