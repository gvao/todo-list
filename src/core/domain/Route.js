import http from 'node:http'

export default class Route {
    method
    path

    /**
     * @param {'GET' | 'POST'} method 
     * @param {string} path 
     * @param {(req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage> & {req: http.IncomingMessage;}) => Promise<void>} handler 
     */
    constructor(method, path, handler) {
        this.method = method
        this.path = path
        this.handler = handler
    }

    /** @param {string} pathRoute  */
    getParameters(pathRoute) {
        const keys = pathRoute.split('/')
        const k = this.path.split('/')
        if(keys.length !== k.length) throw new Error('path length invalid')
        const result = k.reduce((acc, key, i) => {
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
