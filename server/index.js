import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import config from './config'

import userRoutes from './routes/userRoutes'
import authRoutes from './routes/authRoutes'
import profileRoutes from './routes/profileRoutes'

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

app.listen(config.port, config.host, () => {
  console.log(`Available on http://${config.host}:${config.port}`)
})