import express from 'express'
import * as Profile from '../controllers/profileController'

const app = express()

console.log(Profile)
app.post('/create', Profile.createProfile)
app.get('/:userId', Profile.findOneProfile)

export default app