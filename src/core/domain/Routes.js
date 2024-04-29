import fs from 'node:fs/promises'
import Route from './Route.js'
import path from 'node:path'

export default class Routes {
    static fileTypes = ['html', 'css', 'js']
    /** @type {Route[]} */
    #routes = []
    basename

    constructor() { }

    get routes() { return this.#routes }

    async usePublic(pathName) {
        if (!this.basename) this.basename = pathName;
        const routePath = pathName.replace(this.basename, '') || '/'
        const typeFile = Routes.getTypeFile(routePath)
        const isNotFile = !typeFile

        if (isNotFile) {
            const filesName = await fs.readdir(pathName)
            for (const name of filesName) {
                const filePath = path.join(pathName, name)
                const type = Routes.getTypeFile(name)
                const routePathFile = filePath.replace(this.basename, "")
                if (!type) return await this.usePublic(filePath)
                const route = new Route(
                    'GET',
                    routePathFile === '/index.html' ? '/' : routePathFile,
                    async (req, res) => {
                        if (req.method !== 'GET') {
                            res.writeHead(404)
                            return res.end('Page not found!')
                        }
                        const file = await fs.readFile(filePath)
                        res.writeHead(200, { "content-type": `text/${type}` })
                        res.end(file)
                        return
                    }
                )
                this.addRoute(route)
            }
        }
    }

    getRoute(uri, method) {
        const [url, queries] = uri.split('?')
        return this.#routes.find(route => route.path === url && route.method === method)
    }

    /** @param {Route} route  */
    addRoute(route) {
        this.#routes.push(route)
    }

    static getTypeFile = (filePath) => {
        return Routes.fileTypes.find(type => filePath.endsWith(type))
    }
}
