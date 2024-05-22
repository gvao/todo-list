import Login from "../../application/useCases/Login";
import Route from "../Route";

export default class LoginController {
    constructor(private login: Login){}
    controller = () => new Route('POST', '/api/login', async (req, res) => {
        const { body } = req
        const { username, password } = body
        const token = await this.login.execute({ username, password })
        res.status!(200).json({ token })
        // res.writeHead(200, { 'Content-Type': 'application/json'})
        // res.end(JSON.stringify({ token }))
    })
}