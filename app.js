const formAddTodo = document.querySelector('.form-add-todo')
const todosContainer = document.querySelector('.todos-container')

formAddTodo.addEventListener('submit', event => {
    event.preventDefault()

    const { target } = event
    const inputValue = target.add.value.trim()

    if (!inputValue) return

    todosContainer.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${inputValue}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>`

    target.reset()
})

todosContainer.addEventListener('click', event => {
    const { target } = event
    const classList = Array.from(target.classList)
    const isIncludesDelete = classList.includes('delete')
    const li = target.parentElement

    if (!isIncludesDelete) return

    li.remove()
})