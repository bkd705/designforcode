import dotenv from 'dotenv'
import path from 'path'
import http from 'http'

import bodyParser from 'koa-bodyparser'
import koa from 'koa'
import koaRouter from 'koa-router'
import serve from 'koa-static'
import sendFile from 'koa-sendfile'
import SocketIO from 'socket.io'

dotenv.config()

// Instantiate koa and koa-router
const app = new koa()
const router = koaRouter()

// Serve static files
app.use(serve(`${__dirname}/../public/`))

// Enable default middleware
require('./middleware/DefaultMiddleware')(app)

// Enable bodyparser and router
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

// Serve routes
require('./routes/UserRoutes')(router)
require('./routes/AuthRoutes')(router)
require('./routes/CommentRoutes')(router)
require('./routes/PostRoutes')(router)

// Serve front-end route
router.get('*', function * (next) {
  yield sendFile(this, path.join(__dirname, '../public/index.html'))
  yield next
})

// Hook socket.io onto current HTTP server
const server = http.Server(app.callback())
const io = new SocketIO(server)

// Serve socket.io sockets
require('./routes/SocketRoutes')(io)

const host = process.env.SERVER_HOST
const port = process.env.SERVER_PORT

server.listen(port, host, () => {
  console.log(`Available on http://${ host }:${ port }`)
})
