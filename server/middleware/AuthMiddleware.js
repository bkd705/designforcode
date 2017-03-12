// Import node modules
import jwt from 'jsonwebtoken'

// Import utilities
import SendError from '../util/SendError'

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
    return SendError(ctx, 400, 'No authorization header provided')
  }

  // Verify the authorization is in the correct format
  const token = authorization.split(' ')[1]
  if (!token || token.length == 0) {
    return SendError(ctx, 400, 'Invalid token provided')
  }

  // Verify and decode the token
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

    return SendError(ctx, 400, error, ex)
  }

  // Find user model by ID
  const user = await User.find(payload.id)
  if (!user) {
    return SendError(ctx, 403, 'Failed to authenticate user!', user)
  }

  // If no errors occured, set user and go to next state (route)
  ctx.state.user = user
  await next()
}
