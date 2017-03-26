// Import node modules
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Import utilities
import JRes from '../util/JResponse'
import Helpers from '../util/Helpers'
import SendError from '../util/SendError'
import Responses from '../util/Responses'

// Import models
import User from '../models/User'

export default class AuthController {

  /**
   * Method for handling login requests
   * @param ctx - The current request context
   * @param next - The next state to transition to
   */
  static async login(ctx, next) {
    const userInfo = ctx.request.body

    // Find user by username
    const user = await User.findByUsername(userInfo.username)
    if (!user) {
      return SendError(ctx, 400, Responses.USER_NOT_FOUND)
    }

    // Compare password with database hash
    if (!bcrypt.compareSync(userInfo.password, user.attributes.password)) {
      return SendError(ctx, 400, Responses.INCORRECT_PASSWORD)
    }

    // Sanitize user
    const outputUser = Helpers.transformObj(user.attributes, ['id', 'username', 'email'])

    // Create/Sign JWT
    const token = jwt.sign(outputUser, process.env.JWT_SECRET, { expiresIn: '14 days' })

    // Send response
    ctx.body = JRes.success(Responses.LOGIN_SUCCESS, {
      user: outputUser,
      token: token
    })
  }
}
