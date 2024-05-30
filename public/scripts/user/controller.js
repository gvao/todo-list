class UserController {
    /** @type {'login' | 'signup'} */
    typeForm = 'login'
    /** @type {AuthService} */
    authService

    /** @param {AuthService} authService  */
    constructor(authService) {
        this.authService = authService
        this.form = document.querySelector('.form-login')
        this.title = document.querySelector('.form-login__title')
        this.username = this.form.querySelector('.form-login__username')
        this.password = this.form.querySelector('.form-login__password')
        this.passwordConfirm = this.form.querySelector('.form-login__password-confirm')

        if (this.typeForm === "login") this.changeLogin()
    }

    formSubmit() {
        this.form.addEventListener('submit', async event => {
            event.preventDefault()

            const username = this.username.value
            const password = this.password.value
            const passwordConfirm = this.passwordConfirm.value

            const data = { username, password }

            if (this.typeForm === 'login') {
                const result = await this.authService.login(data)
                if (!result) return this.changeSignup()
                window.location.replace('/')
            } else {
                if (password !== passwordConfirm) return alert('password not confirmed')
                const success = await this.authService.signup(data)
                if (!success) return
                this.changeLogin()
            }
        })
    }

    /** @private */
    changeSignup() {
        this.passwordConfirm.focus()
        this.typeForm = "signup"
        this.title.textContent = "Signup"
        this.passwordConfirm.style.display = "block"
    }
    /** @private */
    changeLogin() {
        this.username.focus()
        this.typeForm = "login"
        this.title.textContent = "Login"
        this.passwordConfirm.style.display = "none"
    }
}