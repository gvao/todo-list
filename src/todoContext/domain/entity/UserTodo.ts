import Todo, { TodoProps } from "./Todo";

export default class UserTodo extends Todo {
    readonly userId: string
    readonly createdAt: Date
    constructor({ title, id, isDone, userId, createdAt }: UserTodoProps) {
        super({ title, id, isDone })
        this.userId = userId
        this.createdAt = createdAt
    }

    static create({ title, userId }: UserTodoCreateProps) {
        const todo = super.create({ title })
        const createdAt = new Date()
        return new UserTodo({ title: todo.title, isDone: todo.isDone, id: todo.id, userId, createdAt })
    }
}

type UserTodoProps = TodoProps & {
    userId: string,
    createdAt: Date,
}

export type UserTodoCreateProps = Pick<UserTodoProps, 'userId' | 'title'>
