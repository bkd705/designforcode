import express from 'express'
import AuthController from '../controllers/authController'
import UserController from '../controllers/userController'

const app = express()

app.get('/login', AuthController.authLogin)
app.post('/register', UserController.createUser)

export default app