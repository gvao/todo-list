import http from 'node:http'
import Routes from './Routes.js'

export default class Server {
    #server

    /** @param {Routes} routes  */
    constructor(routes) {
        this.#server = http.createServer(async function (req, res) {
            const url = new URL(req.url, `http://${req.headers.host}`);
            const route = routes.getRoute(url, req.method)
            if(!!route) return await route.handler(req, res)
            
            res.statusCode = 404
            
        })
    }

    listen(port, callback) {
        return this.#server.listen(port, callback)
    }
}