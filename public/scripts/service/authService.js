class AuthService {
    /** @type {string | undefined} */
    token

    checkAuth() {
        const token = this.getToken()
        if (!token) window.location.replace('/user/login.html')
    }

    /** @private */
    getToken = () => this.token = JSON.parse(localStorage.getItem('user_token'))
    /** @private */
    setToken = token => localStorage.setItem('user_token', JSON.stringify(token))

    /** @param {LoginInput} data  */
    async login({ username, password }) {
        const result = await fetcher('/api/login', 'POST', { username, password })
        const { token } = await result.json()
        if (!token) return false
        this.setToken(token)
        return true
    }

    /** @param {SignupInput} data  */
    async signup({ username, password }) {
        const result = await fetcher('/api/signup', 'POST', { username, password })
        return result.status === 201 || result.status === 304
    }

    logout(){
        this.setToken('')
        location.replace('/user/login.html')
    }
}

/**
 * @typedef {object} LoginInput
 * @property {string} username
 * @property {string} password
 */


/**
 * @typedef {object} SignupInput
 * @property {string} username
 * @property {string} password
 */