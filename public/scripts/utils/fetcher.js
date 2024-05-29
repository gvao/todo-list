/**
 * @param {string} url 
 * @param {'GET' | 'POST'| 'DELETE'} method 
 * @param {any} body 
 */
async function fetcher(url, method = 'GET', body) {
    const options = {
        method,
    }
    if (method !== 'GET' && !!body) {
        options.headers = { 'Content-Type': 'application/json' }
        options.body = JSON.stringify(body)
    }

    return fetch(url, options)
}