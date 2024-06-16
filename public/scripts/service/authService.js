class AuthService {
    /** 
     * @type {string | undefined} 
     * @private
    */
    _token = null

    constructor() {
        this._token = this.getToken()
    }

    checkAuth = () => this.getUser()

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

    logout() {
        this.setToken('')
        this.loginRedirect()
    }

    getUser = async () => {
        const token = this.getToken()
        if (!token) this.logout()
        const response = await fetcher('/api/user', 'GET', null, { headers: { authorization: `Bearer ${token}` } })
        if (!response.ok) this.logout()
        const { user } = await response.json()
        return { ...user, token: this.getToken() }
    }

    getToken = () => this._token = JSON.parse(localStorage.getItem('user_token'))
    /** @private */
    setToken = token => localStorage.setItem('user_token', JSON.stringify(token))
    /** @private */
    loginRedirect = () => { window.location.replace('/user/login.html') }

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