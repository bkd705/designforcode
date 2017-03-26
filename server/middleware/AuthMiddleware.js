// Import node modules
import jwt from 'jsonwebtoken'

// Import utilities
import SendError from '../util/SendError'
import Responses from '../util/Responses'

// Import models
import User from '../models/User'

/**
 * Authentication Middleware
 * Attaches user object when authenticated, else returns error
 * @param ctx - The current request context
 * @param next - The next state to transition to
 */
export default async function (ctx, next) {
  const authorization = ctx.headers.authorization

  // Verify the authorization is present
  if (!authorization) {
    return SendError(ctx, 400, Responses.NO_AUTHORIZATION_PROVIDED)
  }

  // Verify the authorization is in the correct format
  const token = authorization.split(' ')[1]
  if (!token || token.length == 0) {
    return SendError(ctx, 400, Responses.INVALID_TOKEN)
  }

  // Verify and decode the token
  let payload = null
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET)
  } catch (ex) {
    let error = Responses.INTERNAL_SERVER_ERROR

    if (ex.name === 'TokenExpiredError') {
      error = Responses.TOKEN_EXPIRED
    } else if (ex.name === 'JsonWebTokenError' && ex.message === 'invalid signature') {
      error = Responses.INVALID_TOKEN
    }

    return SendError(ctx, 400, error, ex)
  }

  // Find user model by ID
  const user = await User.find(payload.id)
  if (!user) {
    return SendError(ctx, 403, Responses.NOT_AUTHORIZED, user)
  }

  // If no errors occured, set user and go to next state (route)
  ctx.state.user = user
  await next()
}
