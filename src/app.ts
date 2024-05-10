import { join } from 'node:path';

import Routes from "./core/infra/Routes";
import Server from './core/infra/Server';

import TodoRepositoryInMemory from "./core/infra/repositories/TodoRepositoryInMemory";
import AddTodo from "./core/application/useCases/AddTodo";
import GetAllTodo from "./core/application/useCases/GetAllTodo";
import RemoveTodo from './core/application/useCases/RemoveTodo';
import UpdateTodoStatus from './core/application/useCases/UpdateTodoStatus';

import GetTodoListController from './core/infra/controllers/GetTodoListController';
import AddTodoController from './core/infra/controllers/AddTodoController';
import RemoveTodoController from './core/infra/controllers/RemoveTodo';
import UpdateTodoStatusController from './core/infra/controllers/UpdateTodoStatus';

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

const publicPath = join('src', 'public')

app.use(Server.jsonParse)
app.staticPath(publicPath)

app.addRoute(getTodoListController.controller())
app.addRoute(addTodoController.controller())
app.addRoute(removeTodoController.controller())
app.addRoute(updateTodoStatusController.controller())

export { app }