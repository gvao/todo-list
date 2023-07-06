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

const insertNewItemInTodo = (title, idInitial) => {
    const id = idInitial || newId();

    if (!title) return alert(`Inserir um valor válido`);

    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.dataset.item = id;

    const span = document.createElement('span');
    span.classList.add('todo-content');
    span.textContent = title;

    const trashIcon = document.createElement('i');
    trashIcon.classList.add('fa', 'fa-trash');
    trashIcon.dataset.trash = id;

    li.appendChild(span);
    li.appendChild(trashIcon);

    todoList.appendChild(li);
};

const showItemIfMatchValue = value => {
    const childrens = Array.from(todoList.children);

    childrens.forEach(item => {
        const textInLowerCase = item.textContent.toLowerCase();
        const isMatch = textInLowerCase.includes(value.toLowerCase());

        if (!isMatch) {
            item.classList.add('hidden');
        } else {
            item.classList.remove('hidden');
        }
    });
};

const removeItem = event => {
    const { target } = event;
    const idElement = target.getAttribute('data-trash');

    if (!idElement) return;

    const item = todoList.querySelector(`[data-item="${idElement}"]`);
    item.remove();
};

const handleSubmit = event => {
    event.preventDefault();
    const title = inputSearch.value.trim();

    insertNewItemInTodo(title);

    form.reset();
    showItemIfMatchValue("");
};

const handleInput = event => {
    const inputValue = event.target.value;

    showItemIfMatchValue(inputValue);
};

const insertInitialTodos = todos.forEach(({ title, id }) => {
    insertNewItemInTodo(title, id);
});

inputSearch.addEventListener('input', handleInput);
form.addEventListener('submit', handleSubmit);
todoList.addEventListener('click', removeItem);
