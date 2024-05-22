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

    it('should return user dto', () => {
        expect(user.dto).toEqual({
            ...input,
            id: user.id,
            password: '64c7ba4cf3ca34448b5a0ac7ec5fb88de9c3695525f52f9fc5a6343a03a693083beb43fe5a7bbddc2e48289180210cdd66ab029a9d16e68a00d41dc64eef78a5'
        })
    })
})