import { addObserver, notifyObservers } from "./observer.js";
import { addTodoItem, filterTodoList } from "./todos.js";
import { renderTodos } from "./ui.js";

const form = document.querySelector('#form-search');
const inputSearch = form.search;

export const todos = [
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