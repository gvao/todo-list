const todoList = document.querySelector('#todo-list')
const form = document.querySelector('#form-search')
const inputSearch = form.search

const todos = [
    { id: newId(), title: 'Fazer isso', isDone: false },
    { id: newId(), title: 'Fazer aquilo', isDone: true },
    { id: newId(), title: 'Fazer tal coisa', isDone: true },
    { id: newId(), title: 'Almoçar', isDone: true },
    { id: newId(), title: 'Musculação', isDone: true },
]

function newId(idLength = 26) {
    const charset = 'abcdefghijklmnopqrstuwxyz' + 'ABCDEFGHIJKLMNOPQRSTUWXYZ' + '0123456789'
    let id = ''

    for (let i = 0; i < idLength; i++) {
        const randomLetter = Math.round(Math.random() * charset.length)

        id += charset.charAt(randomLetter)
    }

    return id
}

const insertNewItemInTodo = (title, idInitial) => {

    const id = idInitial || newId()

    if (!title) return alert(`Inserir um valor válido`)

    todoList.innerHTML += `
    <li class="todo-item" data-item="${id}">
        <span class="todo-content">${title}</span>
        <i class="fa fa-trash" data-trash="${id}"></i>
    </li>`
}

const showItemIfMatchValue = value => {
    const childrens = Array.from(todoList.children)

    childrens.forEach(item => {
        const textInLowerCase = item.textContent.toLowerCase()
        const isMatch = textInLowerCase.includes(value.toLowerCase())

        if (!isMatch) return item.classList.add('hidden')
        return item.classList.remove('hidden')
    })
}

const removeItem = event => {
    const { target } = event
    const idElement = target.getAttribute('data-trash')
    
    if (!idElement) return 
    
    const item = todoList.querySelector(`[data-item="${idElement}"]`)
    item.remove()
}

const handlerSubmit = event => {
    event.preventDefault()
    const title = inputSearch.value.trim()

    insertNewItemInTodo(title)

    form.reset()
    showItemIfMatchValue("")
}

const handlerInput = event => {
    const inputValue = event.target.value

    showItemIfMatchValue(inputValue)
}

const insertInitialsTodos = todos
    .forEach(({ title, id }) => insertNewItemInTodo(title, id))

inputSearch.addEventListener('input', handlerInput)
form.addEventListener('submit', handlerSubmit)
todoList.addEventListener('click', removeItem)