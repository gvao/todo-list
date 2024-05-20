import Signup from "../../application/useCases/Signup";
import Route from "../Route";

export default class SigUpController {
    constructor(private signup: Signup){}
    controller = () => new Route('POST', '/api/signup', async (req, res) => {
        try {
            const { body } = req
            const { username, password } = body
            await this.signup.execute({ username, password })
            res.statusCode = 201
            res.end()
            
        } catch(err) {
            const error = err as Error
            if(error.message ===  'user already exists') {
                res.statusCode = 304
                res.end()
            }
        }
    })
}