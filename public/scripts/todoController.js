class TodoController {
    form
    inputSearch

    #observer = new Observer()

    constructor() {
        this.form = document.querySelector('#form-search');
        this.buttonLogout = document.getElementById('button_logout');
        this.inputSearch = this.form.search;
        this.todoList = document.querySelector('#todo-list');
        this.areas = this.todoList.querySelectorAll('.todo-list__status-list')
        this.areas.forEach(area => {
            const icon = area.querySelector('i')
            const list = area.querySelector('ul')
            const checkBox = area.querySelector('input[type="checkbox"]')
            checkBox.addEventListener('change', event => {
                const chevronClassAdd = checkBox.checked ? 'down' : 'up'
                const chevronClassRemove = !checkBox.checked ? 'down' : 'up'
                const classIcon = icon.classList.item(1)
                const newClassIcon = classIcon.replace(chevronClassRemove, chevronClassAdd)
                icon.classList.remove(classIcon)
                icon.classList.add(newClassIcon)
                list.classList.toggle('--hidden')
            })
        })

        this.inputSearch.addEventListener('input', event => {
            const inputValue = event.target.value;
            this.emit({
                type: 'search',
                input: inputValue
            })
        });

        this.form.addEventListener('submit', event => {
            event.preventDefault();
            const input = this.inputSearch.value.trim();
            this.emit({ type: 'submit', input })
            event.target.reset();
        });

        this.buttonLogout.addEventListener('click', event => this.#observer.notifyObservers({ type: 'logout'}))
    }

    /**
     * @param {Todo[]} todoList 
     */
    render = (todoList) => {
        for (let area of this.areas) {
            const list = area.querySelector('ul')
            const countElement = area.querySelector('.todo-list__quantity')
            const statusList = list.dataset.status
            let count = 0
            list.innerHTML = ''
            todoList.forEach((todo) => {
                const li = this.createTodoElement(todo)
                const isValid = String(todo.isDone) === statusList
                if (!isValid) return
                count++
                list.appendChild(li)
            })
            countElement.textContent = count
        }
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

