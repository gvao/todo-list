import { notifyObservers } from "./observer.js";
import { todos } from "./index.js";
import { newId } from "./utils.js"

export function TodoFactory(title = '', isDone = false) {
    const id = newId()

    return {
        id,
        title,
        isDone,
    }
}

export const addTodoItem = (title = '') => {
    if (!title) return alert('inserir um valor válido');

    const newItem = TodoFactory(title)

    todos.push(newItem)
    notifyObservers(todos)
}

export const removeItem = todo => {
    const index = todos.indexOf(todo)

    if (index < 0) return console.log(`Item not found in list`)

    todos.splice(index, 1)
    notifyObservers(todos)
};

export const filterTodoList = (valueLowerCase) => {
    if (!valueLowerCase) return todos

    return todos.filter(({ title }) => title.toLowerCase().includes(valueLowerCase))
};
