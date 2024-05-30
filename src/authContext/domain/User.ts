import Password from "./Password"

export default class User implements UserInterface {
    id: string
    username
    private password
    constructor({ username, password, id }: UserProps) {
        this.username = username
        this.password = password
        this.id = id
    }

    passwordValidate(plainPassword: string): boolean {
        return this.password.validate(plainPassword)
    }

    get dto() {
        return {
            username: this.username,
            password: this.password.value,
            id: this.id
        }
    }

    static create({ username, password: plainPassword }: UserCreateProps) {
        const id = crypto.randomUUID()
        const salt = 'salt'
        const password = Password.create(plainPassword, salt)
        return new User({ username, password, id });
    }
}


interface UserInterface {
    id: string
    username: string
    passwordValidate(plainPassword: string): boolean
}

type UserProps = Pick<UserInterface, 'username' | 'id'> & {
    password: Password
}

type UserCreateProps = Pick<UserInterface, "username"> & { password: string }