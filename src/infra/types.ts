import http from 'node:http'


export type Middleware = (req: Request, res: Response, next?: () => void) => void
export type Request = http.IncomingMessage & { params?: any, body?: any }
export type Response = http.ServerResponse<http.IncomingMessage> & { req: http.IncomingMessage } & StatusInterface
export type StatusInterface = { status?: (status: number) => { json: (data?: any) => void } }
export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'