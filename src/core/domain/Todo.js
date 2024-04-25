import { newId } from "../utils/newId.js"

export default class Todo {
    #id
    #isDone
    #title

    /**
     * @param {string} title 
     * @param {string} id 
     * @param {boolean} isDone
     */
    constructor(title, id, isDone) {
        if (!title) return alert('inserir um valor válido');
        this.#title = title
        this.#id = id
        this.#isDone = isDone
    }

    get title() { return this.#title; }
    get id() { return this.#id; }
    get isDone() { return this.#isDone; }

    done() { this.#isDone = true }
    undone() { this.#isDone = false }

    /**
     * @param {string} title 
     */
    static create(title) {
        const id = newId()
        const isDone = false
        return new Todo(title, id, isDone)
    }
}