import { beforeAll, describe, expect, it } from "vitest";
import Password from "../../src/domain/Password";

describe('Password', () => {
    const expectedPassword = '210612d58ff2bf48c7fe97680a5d3ff534e07473705595291e56d6801d1655c7da907191ca8fcb6e0825d7bd47437aafa88c9c75cd491a8d537f17f5eedc047c'
    let password: Password

    beforeAll(() => {
        password = Password.create('123456', 'salt')
        expect(password.value).toBe(expectedPassword)
        expect(password.salt).toBe('salt')
    })
    
    it('build password instance', () => {
        const password = new Password(expectedPassword, 'salt')
        expect(password.value).toBe(expectedPassword)
        expect(password.salt).toBe('salt')
    })

    it('create password', () => {
        expect(password.value).toBe(expectedPassword)
    })

    it('valid password', () => {
        const result = password.validate('123456')
        expect(result).toBeTruthy()
    })

})