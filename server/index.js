import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import userRoutes from './routes/userRoutes'
import authRoutes from './routes/authRoutes'
import profileRoutes from './routes/profileRoutes'

dotenv.config()
const app = express()

mongoose.connect('mongodb://localhost/data/db/')
const db = mongoose.connection
db.once('open', () => {
  console.log('Connected to MongoDB at /data/db')
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(express.static(`${__dirname}/../public/`))

app.use('/user', userRoutes)
app.use('/profile', profileRoutes)
app.use('/auth', authRoutes)

app.get('*', (req, res) => {
  res.send(`index.html`)
})

const host = process.env.SERVER_HOST
const port = process.env.SERVER_PORT

app.listen(port, host, () => {
  console.log(`Available on http://${host}:${port}`)
})