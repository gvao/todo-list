import http from 'node:http'
import Routes from './Routes.js'
import Route from './Route.js'

export default class Server {
    /** @type {Routes} */
    #routes

    /** @param {Routes} routes  */
    constructor(routes) {
        this.routes = routes
    }

    /** @param {Route} route */
    addRoute = (route) => { this.#routes.addRoute(route) }
    /** @param {string} path  */
    staticPath = async (path) => { this.#routes.usePublic(path) }
    /** @param {any} middleware */
    use = (middleware) => { this.middleware.push(middleware) }
    /** @param {number} port @param {() => void} callback */
    listen = (port, callback) => {
        const routes = this.#routes

        const server = http.createServer(async function (req, res) {
            const url = new URL(req.url, `http://${req.headers.host}`);
            const route = routes.getRoute(url, req.method)
            if (!!route) return await route.handler(req, res)
            res.statusCode = 404
        })

        return server.listen(port, callback)
    }
}