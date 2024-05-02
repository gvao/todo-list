class TodoGateway {

    /** @param {string} filter  */
    async getAll(filter) {
        let url = '/api/todos'
        if (filter) url += '?' + filter
        const response = await fetcher(url)
        return await response.json()
    }

    async addTodo(title) {
        const response = await fetcher('/api/todos', 'POST', { title })
    }
}

async function fetcher(url, method = 'GET', body) {
    const options = {
        method,
    }
    if (method !== 'GET') {
        options.headers = { 'Content-Type': 'application/json' }
        options.body = JSON.stringify(body)
    }

    return fetch(url, options)
}