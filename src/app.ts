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
import GetTodoListById from './todoContext/application/useCases/GetTodoListById';
import CreateUserTodo from './todoContext/application/useCases/CreateUserTodo';

import GetTodoListController from './todoContext/infra/controllers/GetTodoListController';
import AddTodoController from './todoContext/infra/controllers/AddTodoController';
import RemoveTodoController from './todoContext/infra/controllers/RemoveTodo';
import UpdateTodoStatusController from './todoContext/infra/controllers/UpdateTodoStatus';
import SigUpController from './authContext/infra/controllers/SigUpController';
import LoginController from './authContext/infra/controllers/LoginController';
import GetUserByUsernameController from './authContext/infra/controllers/GetUserByUsernameController';
import GetTodoListByIdController from './todoContext/infra/controllers/GetTodoListByIdController';
import CreateUserTodoController from './todoContext/infra/controllers/CreateUserTodoController';
import PrivateRoute from './authContext/infra/decorators/PrivateRoute';
import GetUserByUsername from './authContext/application/useCases/GetUserByUsername';

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
const getUserByUsername = new GetUserByUsername(userRepository,)
const getTodoListById = new GetTodoListById(userTodoRepository)
const createUserTodo = new CreateUserTodo(userTodoRepository)

const privateRoute = new PrivateRoute(tokenGenerator, userRepository)

const addTodoController = new AddTodoController(addTodo)
const getTodoListController = new GetTodoListController(getAllTodo)
const removeTodoController = new RemoveTodoController(removeTodo)
const updateTodoStatusController = new UpdateTodoStatusController(updateTodoStatus)
const signupController = new SigUpController(signup)
const loginController = new LoginController(login)
const getUserByTokenController = new GetUserByUsernameController(getUserByUsername)
const getTodoListByIdController = new GetTodoListByIdController(getTodoListById)
const createUserTodoController = new CreateUserTodoController(createUserTodo, tokenGenerator, userRepository)

const routes = new Routes()
const app = new Server(routes)

const publicPath = join('public')

app.use(Server.jsonParse)
app.staticPath(publicPath)

app.addRoute(signupController.controller())
app.addRoute(loginController.controller())
app.addRoute(getTodoListController.controller())
app.addRoute(removeTodoController.controller())
app.addRoute(updateTodoStatusController.controller())
app.addRoute(privateRoute.controller(createUserTodoController))
app.addRoute(privateRoute.controller(getUserByTokenController))
app.addRoute(privateRoute.controller(getTodoListByIdController))

export { app }