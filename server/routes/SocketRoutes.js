// Import node modules
import jwt from 'jsonwebtoken'

// Import utilities
import JRes from '../util/JResponse'
import Helpers from '../util/Helpers'

// Import controllers
import SocketController from '../controllers/SocketController'

module.exports = (io) => {
  io.use(async (socket, next) => {
    try {
      await next()
    } catch (err) {
      console.log(err)
      socket.emit(
        'server-error',
        JRes.failure('Unexpected error occured', err)
      )
    }
  })

  io.on('connection', async (socket) => {
    console.log("connection received: " + socket.id)

    socket.on('send-message', async (data) => {
      const auth = await SocketController.authenticateConnection(data)
      if (!auth.success) {
        socket.emit('send-message-error', auth)
      }

      socket.to(auth.data.room).emit('private-message',
        JRes.success('Received private message', { message: data.message })
      )

      socket.emit(
        'send-message-success',
        JRes.success('Successfully sent private message!')
      )
    })

    socket.on('join', async (data) => {
      const auth = await SocketController.authenticateConnection(data)
      if (!auth.success) {
        return socket.emit('join-error', auth)
      }

      socket.join(auth.data.room)
      socket.emit(
        'join-success',
        JRes.success('Successfully joined private chat!', { recipient: auth.data.recipient })
      )
    })
  })
}
