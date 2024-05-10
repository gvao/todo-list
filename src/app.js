const path = require('node:path');

const Routes = require("./core/infra/Routes.js")
const Server = require('./core/infra/Server.js')

const TodoRepositoryInMemory = require("./core/infra/repositories/TodoRepositoryInMemory.js")
const AddTodo = require("./core/application/useCases/AddTodo.js")
const GetAllTodo = require("./core/application/useCases/GetAllTodo.js")
const RemoveTodo = require('./core/application/useCases/RemoveTodo.js')
const UpdateTodoStatus = require('./core/application/useCases/UpdateTodoStatus.js')

const AddTodoController = require('./core/infra/controllers/AddTodoController.js')
const GetTodoListController = require('./core/infra/controllers/GetTodoList.js')
const RemoveTodoController = require('./core/infra/controllers/RemoveTodo.js')
const UpdateTodoStatusController = require('./core/infra/controllers/UpdateTodoStatus.js')

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

module.exports = { app }