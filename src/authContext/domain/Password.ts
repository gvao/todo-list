import { pbkdf2Sync } from 'crypto'

export default class Password {
    constructor(readonly value: string, readonly salt: string) { }

    validate(plainPassword: string) {
        const key = pbkdf2Sync(plainPassword, this.salt, 1000, 64, 'sha512')
        const password = key.toString('hex')
        if (password !== this.value) return false
        return true
    }

    static create(password: string, salt: string) {
        const key = pbkdf2Sync(password, salt, 1000, 64, 'sha512')
        const passwordHashed = key.toString('hex')
        return new Password(passwordHashed, salt)
    }
}
