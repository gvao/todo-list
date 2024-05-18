import { join } from 'node:path';

import Routes from "./infra/Routes";
import Server from './infra/Server';

import TodoRepositoryInMemory from "./infra/repositories/TodoRepositoryInMemory";
import AddTodo from "./application/useCases/AddTodo";
import GetAllTodo from "./application/useCases/GetAllTodo";
import RemoveTodo from './application/useCases/RemoveTodo';
import UpdateTodoStatus from './application/useCases/UpdateTodoStatus';

import GetTodoListController from './infra/controllers/GetTodoListController';
import AddTodoController from './infra/controllers/AddTodoController';
import RemoveTodoController from './infra/controllers/RemoveTodo';
import UpdateTodoStatusController from './infra/controllers/UpdateTodoStatus';

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

const publicPath = join('public')

app.use(Server.jsonParse)
app.staticPath(publicPath)

app.addRoute(getTodoListController.controller())
app.addRoute(addTodoController.controller())
app.addRoute(removeTodoController.controller())
app.addRoute(updateTodoStatusController.controller())

export { app }