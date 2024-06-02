import Route from "../../../shared/domain/Route"
import GetUserByUsername from "../../application/useCases/GetUserByUsername"

export default class GetUserByUsernameController {
    constructor(readonly getUserByUsername: GetUserByUsername) {
    }

    controller() {
        return new Route('GET', '/api/user', async (req, res) => {
            const { username } = req.body
            const user = await this.getUserByUsername.execute(username)
            if (!user) {
                res.status!(404).json()
                return
            }
            res.status!(200).json({ user })
        })
    }
}

