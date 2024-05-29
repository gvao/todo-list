class TodoGateway {
    /** @param {string} filter  */
    async getAll(filter) {
        let url = '/api/todos'
        if (filter) url += '?search=' + filter
        const response = await fetcher(url)
        return await response.json()
    }
    /** @param {string} title  */
    async addTodo(title) {
        const response = await fetcher('/api/todos', 'POST', { title })
    }

    async deleteTodo(id){
        fetcher(`/api/todos/${id}`, 'DELETE')
    }

    async changeStatus(id, status){
        fetcher(`/api/todos/${id}/changeStatus`, 'POST', { status })
    }
}