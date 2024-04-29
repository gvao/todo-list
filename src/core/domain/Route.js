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
}
