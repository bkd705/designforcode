import express from 'express'
import * as User from '../controllers/userController'

const app = express()

app.post('/create', User.createUser)
app.get('/:userid', User.findOneUser)

export default app