import { Middleware } from '../infra/types'

export default class Route {
    method
    path
    handler
    constructor(method: 'GET' | 'POST' | 'DELETE', path: string, handler: Middleware) {
        this.method = method
        this.path = path
        this.handler = handler
    }

    /** @param {string} pathRoute  */
    getParameters(pathRoute: string) {
        const keys = pathRoute.split('/')
        const k = this.path.split('/')
        if (keys.length !== k.length) throw new Error('path length invalid')
        const result = k.reduce((acc: Record<string, any>, key, i) => {
            const isParameter = key.startsWith(':')
            if (!isParameter) return acc
            const parameterKey = key.replace(':', "")
            const parameter = keys[i]
            acc[parameterKey] = parameter
            return acc
        }, {})

        return result
    }
}
