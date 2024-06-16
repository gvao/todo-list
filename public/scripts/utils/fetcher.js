/**
 * @param {string} url 
 * @param {'GET' | 'POST'| 'DELETE'} method 
 * @param {any} body 
 * @param {Partial<RequestInit>} optionsInit 
 */
async function fetcher(url, method = 'GET', body, optionsInit) {
    /** @type {RequestInit} */
    const options = {
        method,
        headers: optionsInit?.headers || {}
    }
    if (method !== 'GET' && !!body) {
        options.headers = { ...options.headers, 'Content-Type': 'application/json' }
        options.body = JSON.stringify(body)
    }
    return fetch(url, options)
}