import { Response } from "../infra/types"

export default class ServerStatus {
    private status = 404
    constructor(readonly res: Response) {
    }

    sendResponse = (status: number) => {
        this.status = status
        return {
            json: this.sendJSON,
        }
    }

    sendJSON = (data?: any): void => {
        if (!data) {
            this.res.end()
            return
        }
        const dataStringify = JSON.stringify(data)
        this.res.writeHead(this.status, { "Content-Type": "Application/json" })
        this.res.end(dataStringify)
        return
    }
}