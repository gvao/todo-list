import path from 'node:path'

import Routes from "./core/domain/Routes.js";
import Server from './core/domain/Server.js';

import TodoRepositoryInMemory from "./core/infra/TodoRepositoryInMemory.js";
import AddTodo from "./core/application/useCases/AddTodo.js";
import GetAllTodo from "./core/application/useCases/GetAllTodo.js";
import RemoveTodo from './core/application/useCases/RemoveTodo.js';
import UpdateTodoStatus from './core/application/useCases/UpdateTodoStatus.js';

import AddTodoController from './core/infra/controllers/AddTodoController.js';
import GetTodoListController from './core/infra/controllers/GetTodoList.js';
import RemoveTodoController from './core/infra/controllers/RemoveTodo.js';
import UpdateTodoStatusController from './core/infra/controllers/UpdateTodoStatus.js';

const todoRepository = new TodoRepositoryInMemory()

const getAllTodo = new GetAllTodo(todoRepository)
const addTodo = new AddTodo(todoRepository)
const removeTodo = new RemoveTodo(todoRepository)
const updateTodoStatus = new UpdateTodoStatus(todoRepository)

const addTodoController = new AddTodoController(addTodo)
const getTodoListController = new GetTodoListController(getAllTodo)
const removeTodoController = new RemoveTodoController(removeTodo)
const updateTodoStatusController = new UpdateTodoStatusController(updateTodoStatus)

const routes = new Routes()
const app = new Server(routes)

const publicPath = path.join('src', 'public')

app.use(Server.jsonParse)
app.staticPath(publicPath)

app.addRoute(getTodoListController.controller())
app.addRoute(addTodoController.controller())
app.addRoute(removeTodoController.controller())
app.addRoute(updateTodoStatusController.controller())

export { app }