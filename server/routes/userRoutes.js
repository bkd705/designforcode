import express from 'express'
import UserController from '../controllers/userController'

const app = express()

app.patch('/update', UserController.updateUser)
app.get('/:id', UserController.getUserById)
app.get('/developers', UserController.getAllDevelopers)
app.get('/designers', UserController.getAllDesigners)

export default app