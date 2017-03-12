'use strict'

import jwt from 'jsonwebtoken'
import JRes from '../util/JResponse'
import co from 'co'
import User from '../models/User'
import Helpers from '../util/Helpers'

module.exports = (io) => {
  io.on('connection', co.wrap(function * (socket) {
    console.log("connection received")
    console.log(socket.id)

    socket.on('private-message', co.wrap(function * (data) {
      console.log(socket.rooms)
    }))

    socket.on('join', co.wrap(function * (data) {
      if (!data || !data.recipient_id || !data.token) {
        socket.emit('join-error', JRes.failure('Please provide the required data'))
        return
      }

      let room = data.room
      let token = data.token

      // Verify the authorization is in the correct format
      token = token.split(' ')[1]
      if (!token || token.length == 0) {
        socket.emit('join-error', JRes.failure('Invalid authorization token'))
        return
      }

      // Verify JWT
      let payload = null
      try {
        payload = jwt.verify(token, process.env.JWT_SECRET)
      } catch (ex) {
        let error = 'An unhandled error has ocurred'

        if (ex.name === 'TokenExpiredError') {
          error = 'Token provided has expired'
        } else if (ex.name === 'JsonWebTokenError' && ex.message === 'invalid signature') {
          error = 'Invalid token'
        }

        socket.emit('join-error', JRes.failure(error, ex))
        return
      }

      // Get other user's information
      const otherUser = yield User.find(data.recipient_id)
      .then(user => {
        if (!user) return JRes.failure('Failed to find other user')
        return JRes.success('Successfully found other user', { user })
      })
      .catch(error => {
        return JRes.failure('Failed to find other user', err)
      })

      if (!otherUser.success) {
        socket.emit('join-error', otherUser)
        return
      }

      room = [payload.id, data.recipient_id].sort()
      room = room[0] + ':' + room[1]

      // Join room
      socket.join(room)

      // Emit success message to socket
      socket.emit('join-success', JRes.success('Successfully joined the chat', {
        user: Helpers.transformObj(otherUser.data.user.attributes, [
          'id', 'username', 'email'
        ])
      }))
    }))
  }))
}
