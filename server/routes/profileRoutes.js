import express from 'express'
import ProfileController from '../controllers/profileController'

const app = express()

app.post('/new', ProfileController.createProfile)
app.patch('/update', ProfileController.updateProfile)
app.get('/user/:id', ProfileController.getProfileByUserId)
app.get('/:id', ProfileController.getProfileById)

export default app