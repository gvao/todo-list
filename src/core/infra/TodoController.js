import createElement from "../utils/createdElement.js";
import Todo from "../domain/Todo.js";
import Observer from "../domain/observer.js";

export default class TodoController {
    form
    inputSearch

    #observer = new Observer()

    constructor() {
        this.form = document.querySelector('#form-search');
        this.inputSearch = this.form.search;
        this.todoList = document.querySelector('#todo-list');

        this.inputSearch.addEventListener('input', event => {
            const inputValue = event.target.value;
            this.emit({
                type: 'search',
                input: inputValue
            })
        });
    }

    handleSubmit = callBack => {
        this.form.addEventListener('submit', event => {
            event.preventDefault();
            const title = this.inputSearch.value.trim();
            event.target.reset();
            callBack(title)
        });
    };

    /**
     * @param {Todo[]} todos 
     */
    render = (todos) => {
        this.todoList.innerHTML = ''
        todos.forEach((todo) => {
            const li = this.createTodoElement(todo)
            this.todoList.appendChild(li)
        })
    }

    /**
     * @private
     * @param {Todo} todo 
     */
    createTodoElement = (todo) => {
        const li = createElement('li', ['todo-item'])
        li.dataset.item = todo.id
        const span = createElement('span', ['todo-content'])
        span.textContent = todo.title
        const checkBox = createElement('input', ['todo-status'])
        checkBox.setAttribute('type', 'checkbox')
        if (!!todo.isDone) {
            checkBox.setAttribute('checked', todo.isDone)
        }
        checkBox.addEventListener("change", event => {
            const status = event.target.checked

            this.emit({
                id: todo.id,
                status,
                type: 'checked',
            })
        })

        const trash = createElement('i', ['fa', 'fa-trash'], () => { this.removeItem(todo.id) })
        trash.dataset.trash = todo.id

        li.appendChild(checkBox)
        li.appendChild(span)
        li.appendChild(trash)
        return li
    }

    /**
     * @private
     * @param {string} id
     */
    removeItem = id => {
        this.emit({
            id,
            type: 'remove'
        })
    }

    /**@param {(event: EventDomain) => void} observer  */
    on(observer) {
        this.#observer.addObserver(observer)
    }

    /** 
    * @private 
    * @param {EventDomain} event
    */
    emit(event) {
        this.#observer.notifyObservers(event)
    }
}

/**
* @typedef {Object} EventDomain
* @property {string} type
* @property {string} id
* @property {boolean} status
* @property {string} input
*/