import path from 'node:path'

import AddTodo from "./core/application/useCases/AddTodo.js";
import GetAllTodo from "./core/application/useCases/GetAllTodo.js";
import Route from "./core/domain/Route.js";
import Routes from "./core/domain/Routes.js";
import TodoRepositoryInMemory from "./core/infra/TodoRepositoryInMemory.js";
import Server from './core/domain/Server.js';
import GetTodoListController from './core/infra/controllers/getTodoList.js';
import AddTodoController from './core/infra/controllers/AddTodoController.js';

const todoRepository = new TodoRepositoryInMemory()
const getAllTodo = new GetAllTodo(todoRepository)
const addTodo = new AddTodo(todoRepository)
const routes = new Routes()

const publicPath = path.join('src', 'public')
await routes.usePublic(publicPath)

const addTodoController = new AddTodoController(addTodo)
const getTodoListController = new GetTodoListController(getAllTodo)

routes.addRoute(getTodoListController.controller())
routes.addRoute(addTodoController.controller())

export const app = new Server(routes)