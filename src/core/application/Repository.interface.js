import Observer from "../domain/observer.js"

/** @interface */
export default class Repository {
    /**@private */
    #observer = new Observer()

    /** @param {(data: any) => void} observer */
    on = (observer) => this.#observer.addObserver(observer)
    emit = (data) => this.#observer.notifyObservers(data)

    save(item) {
        throw new Error('method not implemented')
    }

    getAll() {
        throw new Error('method not implemented')
    }

    getById(id) {
        throw new Error('method not implemented')
    }

    deleteById(id) {
        throw new Error('method not implemented')
    }
}
