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
        JRes.success('Received private message', {
          message: {
            id: Math.floor((Math.random() * 1000) + 1),
            sender_id: auth.data.sender.id,
            message: data.message,
            created_at: new Date().toLocaleString()
          }
        })
      )

      const sent = await SocketController.createMessage(auth.data.sender.id, auth.data.recipient.id, auth.data.room, data.message)
      if (!sent) {
         socket.emit('send-message-error', sent)
      }

      socket.emit('send-message-success', JRes.success('Successfully sent private message!'))
    })

    socket.on('join', async (data) => {
      const auth = await SocketController.authenticateConnection(data)
      if (!auth.success) {
        return socket.emit('join-error', auth)
      }

      socket.join(auth.data.room)

      // Emit success
      socket.emit(
        'join-success',
        JRes.success('Successfully joined private chat!', { recipient: auth.data.recipient })
      )

      // Retreive messages
      const messages = await SocketController.fetchMessages(auth.data.room)
      if (!messages.success) {
        return socket.emit('fetch-messages-error', messages)
      }

      // Emit messages in room
      socket.emit(
        'fetch-messages-success',
        JRes.success('Successfully fetched messages!', { messages: messages.data.messages })
      )
    })
  })
}
