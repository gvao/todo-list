import Login from "../../application/useCases/Login";
import Route from "../../../shared/domain/Route";

export default class LoginController {
    constructor(private login: Login){}
    controller = () => new Route('POST', '/api/login', async (req, res) => {
        const { body } = req
        const { username, password } = body
        try {
            const token = await this.login.execute({ username, password })
            res.status!(200).json({ token })
        } catch(err) {
            const response = res.status!(400)
            response.json({ message: `failed authentication` })
        }
    })
}