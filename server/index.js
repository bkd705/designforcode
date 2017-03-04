import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'

import userRoutes from './routes/userRoutes'
import authRoutes from './routes/authRoutes'
import profileRoutes from './routes/profileRoutes'

dotenv.config()
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(express.static(`${__dirname}/../public/`))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})


app.use('/user', userRoutes)
app.use('/profile', profileRoutes)
// app.use('/auth', authRoutes)

app.get('*', (req, res) => {
  res.send(`index.html`)
})

const host = process.env.SERVER_HOST
const port = process.env.SERVER_PORT

app.listen(port, host, () => {
  console.log(`Available on http://${host}:${port}`)
})