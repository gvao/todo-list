const formAddTodo = document.querySelector('.form-add-todo')
const todosContainer = document.querySelector('.todos-container')
const inputSearch = document.querySelector('.form-search input')

const insertTodo = inputValue => {
    if (!inputValue) return

    const templateHtml = `
    <li class="list-group-item d-flex justify-content-between align-items-center" data-todo=${inputValue}>
        <span>${inputValue}</span>
        <i class="far fa-trash-alt" data-trash=${inputValue} ></i>
    </li>`

    todosContainer.innerHTML += templateHtml
}

const insertItemInTodo = event => {
    event.preventDefault()
    
    const { target } = event
    const inputValue = target.add.value.trim()
    
    insertTodo(inputValue)
    target.reset()
}

const deleteTodo = target => {
    const dataTrash = target.dataset.trash
    
    if(!dataTrash) return 
    const todo = document.querySelector(`[data-todo="${dataTrash}"]`)
    
    todo.remove()

} 

const deleteItemInTodo = event => {
    const { target } = event

    deleteTodo(target)
}

const hiddenOrShowTodo = (element, condition) => {
    const obj = {
        remove: !condition ? 'd-flex' : 'hidden',
        add: condition ? 'd-flex' : 'hidden'
    }

    element.classList.remove(obj.remove)
    element.classList.add(obj.add)
}

const searchInTodo = event => {
    const inputValue = event.target.value.trim().toLowerCase()
    const lis = Array.from(todosContainer.children)
    const isIcludesValue = textContent => textContent.toLowerCase().includes(inputValue)

    lis.forEach(li => hiddenOrShowTodo(li, isIcludesValue(li.textContent)))
}

formAddTodo.addEventListener('submit', insertItemInTodo)
todosContainer.addEventListener('click', deleteItemInTodo)
inputSearch.addEventListener('input', searchInTodo)