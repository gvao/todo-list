import { describe, expect, it } from "vitest";
import User from '../../src/domain/entity/User'

describe('User', () => {
    const input = {
        username: 'any_username',
        password: 'any_password'
    }
    const user = User.create(input)
    it('create user', () => {
        expect(user.id).toBeDefined();
        expect(user.username).toBe('any_username');
    })
    describe('#password', () => {
        it('validate password', () => {
            const result = user.passwordValidate(input.password)
            expect(result).toBeTruthy()
        })
        it('invalid password', () => {
            const result = user.passwordValidate('invalid_password')
            expect(result).toBeFalsy()
        })
    })
})