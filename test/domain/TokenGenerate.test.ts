import { describe, expect, it } from "vitest";
import TokenGenerate from "../../src/authContext/domain/service/TokenGenerate"

describe('TokenGenerate', () => {
    const tokenGenerate = new TokenGenerate('secret')
    const expectedToken = 'eyJhbGciOiJIUzI1NiJ9.YW55X3VzZXJuYW1l.2LGxQDd1Jzf3A_aKv01GxcsoXySCODioasWfR53y82k'

    describe('#generate', () => {
        it('shoul return token', () => {
            const token = tokenGenerate.generate('any_username')
            expect(token).toBe(expectedToken)
        })
    })

    describe('#verify', () => {
        it('Valid token', async () => {
            const payload = tokenGenerate.verify(expectedToken)
            expect(payload).toBe('any_username')
        })

        it('should return error with invalid parameters', async () => {
            const invalidToken = ['vckbdf', '']
            for (const token of invalidToken)
                expect(() => { tokenGenerate.verify(token) }).toThrowError()
        })
    })

})