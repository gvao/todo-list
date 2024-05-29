const authService = new AuthService()
const userController = new UserController(authService)

userController.formSubmit()