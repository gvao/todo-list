import http from 'node:http'
import Routes from "../domain/Routes"
import Route from '../domain/Route'
import { Method, Middleware, Request, Response } from './types'
import ServerStatus from '../../todoContext/domain/ServerStatus'


export default class Server {
    private middleware: Middleware[] = []

    constructor(private routes: Routes) { }

    addRoute = (route: Route) => { this.routes.addRoute(route) }
    staticPath = async (path: string) => { this.routes.usePublic(path) }
    use = (middleware: Middleware) => { this.middleware.push(middleware) }
    listen = (port: number | string, callback: () => void) => {
        const server = http.createServer((req: Request, res: Response) => {
            const serverResponse = new ServerStatus(res)
            res.status = serverResponse.sendResponse

            let i = 0
            const next = () => {
                const middleware = this.middleware[i++]
                if (!!middleware) {
                    middleware(req, res, next)
                    return
                }

                const url = new URL(req.url!, `http://${req.headers.host}`);
                const route = this.routes.getRoute(url, req.method as Method)
                if (!!route) {
                    const params = route.getParameters(url.pathname)
                    req.params = params
                    return route.handler(req, res)
                }
                res.statusCode = 404
                res.end('not found')
            }
            next()
        })

        return server.listen(port, callback)
    }

    static jsonParse: Middleware = (req, res, next) => {
        const isApplicationJson = req.headers['content-type'] === 'application/json'
        if (!isApplicationJson) return next!()

        const chunks: Uint8Array[] = []
        req.on('data', chunk => chunks.push(chunk))
        req.on('end', () => {
            const result = Buffer.concat(chunks).toString()
            const body = JSON.parse(result)
            req.body = body
            next!()
        })
    }
}