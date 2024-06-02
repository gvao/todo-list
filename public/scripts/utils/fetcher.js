/**
 * @param {string} url 
 * @param {'GET' | 'POST'| 'DELETE'} method 
 * @param {any} body 
 * @param {string} token
 */
async function fetcher(url, method = 'GET', body, auth) {
    const options = {
        method,
    }
    if (method !== 'GET' && !!body) {
        options.headers = { 'Content-Type': 'application/json' }
        options.body = JSON.stringify(body)
    }
    if(auth) {
        options.headers['authorization'] = auth
    }

    return fetch(url, options)
}