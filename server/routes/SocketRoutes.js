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

    socket.on('hook-notifications', async (data) => {
      // Get user associated with request
      const user = await SocketController.getUser(data)
      if (!user.success) {
        return socket.emit('hook-notifications-error', user)
      }

      // Join their notification room
      socket.join(user.data.user.id)

      // Emit hook notification success to user
      socket.to(user.data.user.id).emit('hook-notifications-success',
        JRes.success('Received hooked notifications')
      )
    })

    socket.on('send-message', async (data) => {
      // Authenticate chat (get room, sender, and recipient)
      const auth = await SocketController.authenticateConnection(data)
      if (!auth.success) {
        socket.emit('send-message-error', auth)
      }

      // Save message to database
      const sent = await SocketController.createMessage(auth.data.sender.id, auth.data.recipient.id, auth.data.room, data.message)
      if (!sent) {
         return socket.emit('send-message-error', sent)
      }

      // Emit message to recipient's private chat
      socket.to(auth.data.room).emit('private-message',
        JRes.success('Received private message', {
          message: {
            id: Math.floor((Math.random() * 1000) + 1),
            sender_id: auth.data.sender.id,
            message: data.message,
            created_at: new Date()
          }
        })
      )

      // Emit notification to recipient
      socket.to(auth.data.recipient.id).emit('notification', {
        from_user: auth.data.sender,
        type: 'message',
        created_at: new Date()
      })

      // Emit success message to sender
      socket.emit('send-message-success', JRes.success('Successfully sent private message!'))
    })

    socket.on('join', async (data) => {
      // Authenticate chat (get room, sender, and recipient)
      const auth = await SocketController.authenticateConnection(data)
      if (!auth.success) {
        return socket.emit('join-error', auth)
      }

      // Add socket to private chat room
      socket.join(auth.data.room)

      // Emit join success to user
      socket.emit(
        'join-success',
        JRes.success('Successfully joined private chat!', { recipient: auth.data.recipient })
      )

      // Retreive private chat messages
      const messages = await SocketController.fetchMessages(auth.data.room)
      if (!messages.success) {
        return socket.emit('fetch-messages-error', messages)
      }

      // Emit private messages to user
      socket.emit(
        'fetch-messages-success',
        JRes.success('Successfully fetched messages!', { messages: messages.data.messages })
      )
    })
  })
}
