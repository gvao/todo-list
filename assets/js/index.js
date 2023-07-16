const todoList = document.querySelector('#todo-list');
const form = document.querySelector('#form-search');
const inputSearch = form.search;


const todos = [
    { id: newId(), title: 'Fazer isso', isDone: false },
    { id: newId(), title: 'Fazer aquilo', isDone: true },
    { id: newId(), title: 'Fazer tal coisa', isDone: true },
    { id: newId(), title: 'Almoçar', isDone: true },
    { id: newId(), title: 'Musculação', isDone: true },
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

const createElement = (tagName = '', classNames = []) => {
    const element = document.createElement(tagName)
    classNames.forEach(className => element.classList.add(className))

    return element
}

const addTodoItem = (title = '') => {
    if (!title) return alert('inserir um valor válido');

    const newItem = {
        id: newId(),
        title,
        isDone: false
    }

    todos.push(newItem)
    renderTodos(todos)
}

const removeItem = event => {
    const { target } = event;
    const idElement = target.getAttribute('data-trash');

    if (!idElement) return;

    const item = todoList.querySelector(`[data-item="${idElement}"]`);
    item.remove();
};

const filterTodoList = searchValue => {
    const valueLowerCase = searchValue.toLowerCase()

    const filteredItems = todos.filter(({ title }) => title.toLowerCase().includes(valueLowerCase))

    renderTodos(filteredItems)
};

const handleSubmit = event => {
    event.preventDefault();
    const title = inputSearch.value.trim();

    addTodoItem(title);
    form.reset();
};

function handleInput(event) {
    const inputValue = event.target.value;

    filterTodoList(inputValue);
};

function renderTodos(todos = []) {
    todoList.innerHTML = ''

    todos
        .forEach(({ id, title }) => {
            const li = createElement('li', ['todo-item'])
            li.dataset.item = id

            const span = createElement('span', ['todo-content'])
            span.textContent = title

            const trash = createElement('i', ['fa', 'fa-trash'])
            trash.dataset.trash = id

            li.appendChild(span)
            li.appendChild(trash)

            todoList.appendChild(li)
        })

}

form.addEventListener('submit', handleSubmit);
inputSearch.addEventListener('input', handleInput);
todoList.addEventListener('click', removeItem);

renderTodos(todos)