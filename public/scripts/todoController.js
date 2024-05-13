class TodoController {
    form
    inputSearch

    #observer = new Observer()

    constructor() {
        this.form = document.querySelector('#form-search');
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
    }

    /**
     * @param {Todo[]} todoList 
     */
    render = (todoList) => {
        for (let area of this.areas) {
            const list = area.querySelector('ul')
            const quantityElement = area.querySelector('.todo-list__quantity')
            const statusList = list.dataset.status
            todoList.forEach((todo) => {
                const li = this.createTodoElement(todo)
                if (String(todo.isDone) !== statusList) return
                console.log(quantity)
                list.appendChild(li)
            })

            const resultQuantity = todoList.reduce((acc, todo) => {
                const category = todo.isDone ? 'done' : 'do'
                console.log(category, todo)
                // if(!acc[category]) acc[category] = 0
                // acc[category] = resultQuantity + 1
                return acc
            }, {})

            console.log(resultQuantity)
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

