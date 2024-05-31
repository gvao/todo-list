import { join } from 'node:path';

import Routes from "./shared/domain/Routes";
import Server from './shared/infra/Server';

import TodoRepositoryInMemory from "./todoContext/infra/repositories/TodoRepositoryInMemory";
import UserTodoRepositoryInMemory from './todoContext/infra/repositories/UserTodoRepositoryInMemory';
import UserRepositoryInMemory from './authContext/infra/repositories/UserRepositoryInMemory';

import TokenGenerate from './authContext/domain/service/TokenGenerate';

import AddTodo from "./todoContext/application/useCases/AddTodo";
import GetAllTodo from "./todoContext/application/useCases/GetAllTodo";
import RemoveTodo from './todoContext/application/useCases/RemoveTodo';
import UpdateTodoStatus from './todoContext/application/useCases/UpdateTodoStatus';
import Signup from './authContext/application/useCases/Signup';
import Login from './authContext/application/useCases/Login';
import GetUserByToken from './authContext/application/useCases/GetUserByToken';
import GetTodoListById from './todoContext/application/useCases/GetTodoListById';

import GetTodoListController from './todoContext/infra/controllers/GetTodoListController';
import AddTodoController from './todoContext/infra/controllers/AddTodoController';
import RemoveTodoController from './todoContext/infra/controllers/RemoveTodo';
import UpdateTodoStatusController from './todoContext/infra/controllers/UpdateTodoStatus';
import SigUpController from './authContext/infra/controllers/SigUpController';
import LoginController from './authContext/infra/controllers/LoginController';
import GetUserByTokenController from './authContext/infra/controllers/GetUserByTokenController';
import GetTodoListByIdController from './todoContext/infra/controllers/GetTodoListByIdController';

const todoRepository = new TodoRepositoryInMemory()
const userRepository = new UserRepositoryInMemory()
const userTodoRepository = new UserTodoRepositoryInMemory()
const tokenGenerator = new TokenGenerate('secret')

const getAllTodo = new GetAllTodo(todoRepository)
const addTodo = new AddTodo(todoRepository)
const removeTodo = new RemoveTodo(todoRepository)
const updateTodoStatus = new UpdateTodoStatus(todoRepository)
const signup = new Signup(userRepository)
const login = new Login(userRepository, tokenGenerator)
const getUserByToken = new GetUserByToken(tokenGenerator, userRepository)
const getTodoListById = new GetTodoListById(tokenGenerator, userRepository, userTodoRepository)

const addTodoController = new AddTodoController(addTodo)
const getTodoListController = new GetTodoListController(getAllTodo)
const removeTodoController = new RemoveTodoController(removeTodo)
const updateTodoStatusController = new UpdateTodoStatusController(updateTodoStatus)
const signupController = new SigUpController(signup)
const loginController = new LoginController(login)
const getUserByTokenController = new GetUserByTokenController(getUserByToken)
const getTodoListByIdController = new GetTodoListByIdController(getTodoListById)

const routes = new Routes()
const app = new Server(routes)

const publicPath = join('public')

app.use(Server.jsonParse)
app.staticPath(publicPath)

app.addRoute(getTodoListController.controller())
app.addRoute(addTodoController.controller())
app.addRoute(removeTodoController.controller())
app.addRoute(updateTodoStatusController.controller())
app.addRoute(signupController.controller())
app.addRoute(loginController.controller())
app.addRoute(getUserByTokenController.controller())
app.addRoute(getTodoListByIdController.controller())

export { app }