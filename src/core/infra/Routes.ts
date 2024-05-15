import path from 'node:path'
import fs from 'node:fs/promises'
import Route from './Route.js'
import { Method } from './types'

export default class Routes {
    static types: Record<string, string> = {
        svg: 'image/svg+xml',
        png: 'image/png',
        jpeg: 'image/jpeg',
        gif: 'image/gif',
        ico: 'image/x-icon',
        css: 'text/css',
        js: 'text/js',
        html: 'text/html',
    }
    static fileTypes = Object.keys(this.types)
    /** @type {Route[]} */
    #routes: Route[] = []
    basename?: string

    constructor() { }

    get routes() { return this.#routes }

    async usePublic(pathName: string) {
        if (!this.basename) this.basename = pathName;
        const routePath = pathName.replace(this.basename, '') || '/'
        const typeFile = Routes.getTypeFile(routePath)
        const isNotFile = !typeFile

        if (isNotFile) {
            const filesName = await fs.readdir(pathName)
            for (const name of filesName) {
                const filePath = path.join(pathName, name)
                const routePathFile = filePath.replace(this.basename, "")
                const type = Routes.getTypeFile(name)
                if (!type) await this.usePublic(filePath)
                else {
                    const route = new Route(
                        'GET',
                        routePathFile === '/index.html' ? '/' : routePathFile,
                        async (req, res) => {
                            if (req.method !== 'GET') {
                                res.writeHead(404)
                                return res.end('Page not found!')
                            }
                            const file = await fs.readFile(filePath)
                            res.writeHead(200, { "content-type": Routes.getMimeType(type) })
                            res.end(file)
                            return
                        }
                    )
                    this.addRoute(route)
                }

            }
        }
    }

    getRoute(url: URL, method: Method) {
        const { pathname, } = url
        const route = this.#routes.find(route => {
            const pathSplited = route.path.split('/')
            const pathnameSplited = pathname.split('/')
            if (pathSplited.length !== pathnameSplited.length) return
            const isPathValid = pathSplited.every((each, i) => {
                const isEqual = each === pathnameSplited[i]
                return isEqual || each.startsWith(":")
            })

            return isPathValid && route.method === method
        })
        return route
    }

    addRoute(route: Route) {
        this.#routes.push(route)
    }

    static getTypeFile = (filePath: string) => Routes.fileTypes.find(type => filePath.endsWith(type))
    static getMimeType = (type: string) => Routes.types[type]
}
