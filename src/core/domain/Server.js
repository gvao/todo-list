import http from 'node:http'
import Routes from './Routes.js'
import Route from './Route.js'

export default class Server {
    /** @type {Routes} */
    #routes
    /** @type {Middleware[]} */
    #middleware = []

    /** @param {Routes} routes  */
    constructor(routes) {
        this.#routes = routes
    }

    /** @param {Route} route */
    addRoute = (route) => { this.#routes.addRoute(route) }
    /** @param {string} path  */
    staticPath = async (path) => { this.#routes.usePublic(path) }
    /** @param {Middleware} middleware */
    use = (middleware) => { this.#middleware.push(middleware) }
    /** @param {number} port @param {() => void} callback */
    listen = (port, callback) => {
        const server = http.createServer((req, res) => {
            let i = 0
            const next = () => {
                const middleware = this.#middleware[i++]
                if (!!middleware) {
                    middleware(req, res, next)
                    return
                }

                const url = new URL(req.url, `http://${req.headers.host}`);
                const route = this.#routes.getRoute(url, req.method)
                if (!!route) return route.handler(req, res)
                res.statusCode = 404
                res.end('not found')
            }
            next()
        })

        return server.listen(port, callback)
    }

    /** @type {Middleware} */
    static jsonParse(req, res, next) {
        const isApplicationJson = req.headers['content-type'] === 'application/json'
        if (!isApplicationJson) {
            next()
            return 
        }

        const chunks = []
        req.on('data', chunk =>  chunks.push(chunk))
        req.on('end', () => {
            const result = Buffer.concat(chunks).toString()
            const body = JSON.parse(result)
            req.body = body
            next()
        })
    }

}


/** @typedef {(req: Request, res: Response, next: Function) => void} Middleware */
/** @typedef {http.IncomingMessage} Request */
/** @typedef {http.ServerResponse<http.IncomingMessage> & {req: http.IncomingMessage;}} Response */