import { JsonWebTokenError, JwtPayload, sign, verify, } from 'jsonwebtoken'

export default class TokenGenerate {
    constructor(private secretKey: string) { }
    generate(argument: string | object) {
        const token = sign(argument, this.secretKey)
        return token
    }

    verify = (token: string) => {
        const errors: string[] = []
        try {
            const payload = verify(token, this.secretKey) as string
            return { payload, error: errors.length > 0 && errors }
        } catch (err: unknown) {
            const error = err as JsonWebTokenError
            errors.push(`invalid token: ${error.message}`)
            return { payload: null, error: errors }
        }
    }
}