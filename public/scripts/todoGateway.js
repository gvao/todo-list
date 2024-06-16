class TodoGateway {
    #token
    urlBase = '/api/user/todo'
    /** @param {AuthService} authService  */
    constructor(authService) {
        this.#token = authService.getToken()
        this.optionsFetcher = { headers: { authorization: this.#token } }
    }
    /** @param {string} filter  */
    async getAll(filter) {
        let url = this.urlBase
        if (filter) url += '?search=' + filter
        const response = await fetcher(url, "GET", null, this.optionsFetcher)
        return await response.json()
    }
    /** @param {string} title  */
    async addTodo(title) {
        const response = await fetcher(this.urlBase, 'POST', { title }, this.optionsFetcher)
        return { success: response.ok }
    }

    async deleteTodo(id) {
        fetcher(`${this.urlBase}/${id}`, 'DELETE', null, this.optionsFetcher)
    }

    async changeStatus(id, status) {
        fetcher(`${this.urlBase}/${id}/changeStatus`, 'POST', { status }, this.optionsFetcher)
    }
}