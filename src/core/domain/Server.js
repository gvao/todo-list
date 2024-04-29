import http from 'node:http'
import Routes from './Routes.js'

export default class Server {
    #server
    /** @type {Routes} */
    routes

    /** @param {Routes} routes  */
    constructor(routes) {
        this.routes = routes
        this.#server = http.createServer(async function (req, res) {
            const { url, method } = req

            const route = routes.getRoute(url, method)
            return await route.handler(req, res)
        })
    }

    get server() { return this.#server }
}