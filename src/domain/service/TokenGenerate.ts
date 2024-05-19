import { sign } from 'jsonwebtoken'

export default class TokenGenerate {
    private espiresAt = 5 * 60 * 1000
    constructor(private secretKey: string) { }
    generate(argument: string | object) {
        const token = sign(argument, this.secretKey)
        return token
    }
}