import http from 'node:http'


export type Middleware = (req: Request, res: Response, next?: () => void) => void
export type Request = http.IncomingMessage & { params?: any, body?: any }
export type Response = http.ServerResponse<http.IncomingMessage> & { req: http.IncomingMessage; }
export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'