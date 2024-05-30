import { describe, expect, it } from "vitest";
import TokenGenerate from "../../src/authContext/domain/service/TokenGenerate"

describe('TokenGenerate', () => {
    it('shoul return token', () => {
        const expectedToken = 'eyJhbGciOiJIUzI1NiJ9.YW55X3VzZXJuYW1l.2LGxQDd1Jzf3A_aKv01GxcsoXySCODioasWfR53y82k'
        const tokenGenerate = new TokenGenerate('secret')
        const token = tokenGenerate.generate('any_username')
        expect(token).toBe(expectedToken)
    })
})