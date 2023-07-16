const todoList = document.querySelector('#todo-list');
const form = document.querySelector('#form-search');
const inputSearch = form.search;

const todos = [
    {
        id: "DSE1r4RRBMcWJOpuHCWDwGu9h0",
        title: "Fazer isso",
        isDone: false
    },
    {
        id: "QxJIPecBBjE93tX1bpsd59ZGS1",
        title: "Fazer aquilo",
        isDone: true
    },
    {
        id: "GTdbU1tZ9ERoIi0b9UTM2j0r6y",
        title: "Fazer tal coisa",
        isDone: true
    },
    {
        id: "DS6ILO1L4HeiPLpkEP4EKhbAAu",
        title: "Almoçar",
        isDone: false
    },
    {
        id: "rAxi4PsuYYLTGxebm1X63UqGYw",
        title: "Musculação",
        isDone: true
    }
];

function newId(idLength = 26) {
    const charset = 'abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789';
    let id = '';

    for (let i = 0; i < idLength; i++) {
        const randomLetter = Math.floor(Math.random() * charset.length);
        id += charset.charAt(randomLetter);
    }

    return id;
}

function TodoFactory(title = '', isDone = false) {
    const id = newId()

    return {
        id,
        title,
        isDone,
    }
}

const createElement = (tagName = '', classNames = [], onClick) => {
    const element = document.createElement(tagName)
    classNames.forEach(className => element.classList.add(className))

    if (onClick) {
        element.addEventListener('click', onClick)
    }

    return element
}

function renderTodos(todos = []) {
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

const addTodoItem = (title = '') => {
    if (!title) return alert('inserir um valor válido');

    const newItem = TodoFactory(title)

    todos.push(newItem)
    notifyObservers(todos)
}

const removeItem = todo => {
    const index = todos.indexOf(todo)

    if (index < 0) return console.log(`Item not found in list`)

    todos.splice(index, 1)
    notifyObservers(todos)
};

const filterTodoList = (valueLowerCase) => {
    if (!valueLowerCase) return todos

    return todos.filter(({ title }) => title.toLowerCase().includes(valueLowerCase))
};

const { addObserver, removeObserver, notifyObservers } = (() => {
    const observers = []

    const addObserver = observer => observers.push(observer)

    const removeObserver = observer => {
        const index = observers.indexOf(observer)
        if (index < 0) return console.log('observer not found')

        observers.splice(index, 1)
    }

    const notifyObservers = (todos) => observers.forEach(observer => observer(todos))

    return {
        addObserver,
        removeObserver,
        notifyObservers,
    }
})()

addObserver(renderTodos)

const handleSubmit = event => {
    event.preventDefault();
    const title = inputSearch.value.trim();

    addTodoItem(title);
    form.reset();
    notifyObservers(todos)
};

function handleInput(event) {
    const inputValue = event.target.value;

    const todosFiltered = filterTodoList(inputValue);
    notifyObservers(todosFiltered)
};

form.addEventListener('submit', handleSubmit);
inputSearch.addEventListener('input', handleInput);

renderTodos(todos)