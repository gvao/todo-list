import { join } from 'node:path';

import Routes from "./shared/domain/Routes";
import Server from './shared/infra/Server';

import TodoRepositoryInMemory from "./todoContext/infra/repositories/TodoRepositoryInMemory";
import UserTodoRepositoryInMemory from './todoContext/infra/repositories/UserTodoRepositoryInMemory';
import UserRepositoryInMemory from './authContext/infra/repositories/UserRepositoryInMemory';

import TokenGenerate from './authContext/domain/service/TokenGenerate';

import RemoveTodo from './todoContext/application/useCases/RemoveTodo';
import UpdateTodoStatus from './todoContext/application/useCases/UpdateTodoStatus';
import Signup from './authContext/application/useCases/Signup';
import Login from './authContext/application/useCases/Login';
import GetTodoListById from './todoContext/application/useCases/GetTodoListById';
import CreateUserTodo from './todoContext/application/useCases/CreateUserTodo';

import RemoveTodoController from './todoContext/infra/controllers/RemoveTodoController';
import UpdateTodoStatusController from './todoContext/infra/controllers/UpdateTodoStatus';
import SigUpController from './authContext/infra/controllers/SigUpController';
import LoginController from './authContext/infra/controllers/LoginController';
import GetUserByUsernameController from './authContext/infra/controllers/GetUserByUsernameController';
import GetTodoListByIdController from './todoContext/infra/controllers/GetTodoListByIdController';
import CreateUserTodoController from './todoContext/infra/controllers/CreateUserTodoController';
import PrivateRoute from './shared/infra/decorators/PrivateRoute';
import GetUserByUsername from './authContext/application/useCases/GetUserByUsername';

const userRepository = new UserRepositoryInMemory()
const userTodoRepository = new UserTodoRepositoryInMemory()

const tokenGenerator = new TokenGenerate('secret')
const privateRoute = new PrivateRoute(tokenGenerator, userRepository)

const signup = new Signup(userRepository)
const login = new Login(userRepository, tokenGenerator)
const removeTodo = new RemoveTodo(userTodoRepository)
const updateTodoStatus = new UpdateTodoStatus(userTodoRepository)
const getUserByUsername = new GetUserByUsername(userRepository,)
const getTodoListById = new GetTodoListById(userTodoRepository)
const createUserTodo = new CreateUserTodo(userTodoRepository)

const removeTodoController = new RemoveTodoController(removeTodo)
const updateTodoStatusController = new UpdateTodoStatusController(updateTodoStatus)
const signupController = new SigUpController(signup)
const loginController = new LoginController(login)
const getUserByUsernameController = new GetUserByUsernameController(getUserByUsername)
const getTodoListByIdController = new GetTodoListByIdController(getTodoListById)
const createUserTodoController = new CreateUserTodoController(createUserTodo)

const routes = new Routes()
const app = new Server(routes)

const publicPath = join('public')

app.use(Server.jsonParse)
app.staticPath(publicPath)

app.addRoute(signupController.controller())
app.addRoute(loginController.controller())
app.addRoute(privateRoute.controller(removeTodoController))
app.addRoute(privateRoute.controller(updateTodoStatusController))
app.addRoute(privateRoute.controller(createUserTodoController))
app.addRoute(privateRoute.controller(getUserByUsernameController))
app.addRoute(privateRoute.controller(getTodoListByIdController))

export { app }