const formAddTodo = document.querySelector('.form-add-todo')
const todosContainer = document.querySelector('.todos-container')
const inputSearch = document.querySelector('.form-search input')


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

inputSearch.addEventListener('input', event => {
    const inputValue = event.target.value.trim().toLowerCase()  
    const lis = Array.from(todosContainer.children)
    const isIcludesValue = textContent =>  textContent.toLowerCase().includes(inputValue)

    lis
        .filter(({ textContent }) => ! isIcludesValue(textContent))
        .forEach(li => {
            li.classList.remove('d-flex')
            li.classList.add('hidden')
        })

    lis
        .filter(({ textContent }) => isIcludesValue(textContent))
        .forEach(li => {
            li.classList.remove('hidden')
            li.classList.add('d-flex')
        })

})