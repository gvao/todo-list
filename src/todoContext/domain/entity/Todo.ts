import crypto from 'crypto'
import { TodoDto } from "../todoTypes";

export default class Todo {
    #id
    #isDone
    #title

    constructor(title: string, id: string, isDone: boolean) {
        if (!title) throw new Error('inserir um valor válido');
        this.#title = title
        this.#id = id
        this.#isDone = isDone
    }

    get title() { return this.#title; }
    get id() { return this.#id; }
    get isDone() { return this.#isDone; }
    get test() { return 'test' }

    done() { this.#isDone = true }
    undone() { this.#isDone = false }

    static create(title: string) {
        const id = crypto.randomUUID()
        const isDone = false
        const todo = new Todo(title, id, isDone)
        return todo
    }

    get dto(): TodoDto {
        return {
            title: this.#title,
            id: this.#id,
            isDone: this.#isDone
        }
    }
}