import crypto from 'crypto'
import { TodoDto } from "../todoTypes";

export default class Todo {
    private _title: string
    private _id: string
    private _isDone: boolean
    constructor({ title, id, isDone }: TodoProps) {
        if (!title) throw new Error('inserir um valor válido');
        this._title = title
        this._id = id
        this._isDone = isDone
    }

    get title() { return this._title; }
    get id() { return this._id; }
    get isDone() { return this._isDone; }

    done() { this._isDone = true }
    undone() { this._isDone = false }

    static create({ title }: TodoCreateProps) {
        const id = crypto.randomUUID()
        const isDone = false
        const todo = new Todo({ title, id, isDone })
        return todo
    }

    get dto(): TodoDto {
        return {
            title: this._title,
            id: this._id,
            isDone: this._isDone
        }
    }
}

export type TodoProps = {
    title: string,
    id: string,
    isDone: boolean,
}

export type TodoCreateProps = Pick<TodoProps, "title">