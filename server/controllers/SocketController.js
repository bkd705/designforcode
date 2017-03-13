// Import node modules
import jwt from 'jsonwebtoken'

// Import utilities
import JRes from '../util/JResponse'
import Helpers from '../util/Helpers'

// Import models
import User from '../models/User'

export default class SocketController {

  /**
   * Method for authorizing a chat
   * @param next - The next state to transition to
   */
  static async authenticateConnection(data) {
    let token = data.token
    let recipient_id = data.recipient_id

    if (!token || !recipient_id) {
      return JRes.failure('Please provide the required data')
    }

    // Verify the authorization is in the correct format
    token = token.split(' ')[1]
    if (!token || token.length == 0) {
      return JRes.failure('Invalid authorization token')
    }

    // Verify JWT
    let payload = null
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET)
    } catch (ex) {
      let error = 'A token error has ocurred'

      if (ex.name === 'TokenExpiredError') {
        error = 'Token provided has expired'
      } else if (ex.name === 'JsonWebTokenError' && ex.message === 'invalid signature') {
        error = 'Invalid token'
      }

      return JRes.failure(error, ex)
    }

    // Get other user's information
    const user = await User.find(payload.id)
    if (!user) {
      return JRes.failure('Failed to authenticate you, please re-login', user)
    }

    // Get other user's information
    const recipient = await User.find(recipient_id)
    if (!recipient) {
      return JRes.failure('Failed to find recipient', recipient)
    }

    let room = [user.id, recipient.id].sort()
    room = room[0] + ':' + room[1]

    return JRes.success('Successfully authenticated socket', {
      room,
      recipient: Helpers.transformObj(recipient.attributes, [
        'id', 'username', 'email'
      ])
    })
  }
}
