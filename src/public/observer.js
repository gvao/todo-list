class Observer {
    #observers = []

    addObserver = observer => this.#observers.push(observer)
    
    removeObserver = observer => {
        const index = this.#observers.indexOf(observer)
        if (index < 0) return console.log('observer not found')
    
        this.#observers.splice(index, 1)
    }
    
    notifyObservers = (data) => this.#observers.forEach(observer => observer(data))
    
}

/**
 * @typedef {object} Todo
 * @property {string} id
 * @property {string} title
 * @property {boolean} isDone
 */


/**
* @typedef {Object} EventDomain
* @property {string} type
* @property {string} id
* @property {boolean} status
* @property {string} input
*/