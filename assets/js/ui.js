import { removeItem } from "./todos.js"

const createElement = (tagName = '', classNames = [], onClick) => {
    const element = document.createElement(tagName)
    classNames.forEach(className => element.classList.add(className))

    if (onClick) {
        element.addEventListener('click', onClick)
    }

    return element
}

export function renderTodos(todos = []) {
    const todoList = document.querySelector('#todo-list');
    todoList.innerHTML = ''

    todos
        .forEach((todo) => {
            const li = createElement('li', ['todo-item'])
            li.dataset.item = todo.id

            const span = createElement('span', ['todo-content'])
            span.textContent = todo.title

            const trash = createElement('i', ['fa', 'fa-trash'], () => removeItem(todo))
            // trash.dataset.trash = id

            li.appendChild(span)
            li.appendChild(trash)

            todoList.appendChild(li)
        })
}