import GetUserByToken from "../../application/useCases/GetUserByToken"
import Route from "../../../shared/domain/Route"
import { getToken } from "../../../shared/utils/getToken"

export default class GetUserByTokenController {
    constructor(readonly getUserByToken: GetUserByToken) {
    }

    controller() {
        return new Route('GET', '/api/user', async (req, res) => {
            const authorization = req.headers.authorization
            if (!authorization) throw new Error(`Invalid authorization`)
            const token = getToken(authorization)
            const user = await this.getUserByToken.execute(token)
            if (!user) {
                res.status!(404).json()
                return
            }
            res.status!(200).json({ user })
        })
    }
}

