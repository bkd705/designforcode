import jwt from 'jsonwebtoken'
import db from '../config/db'
import JRes from '../util/JResponse'

const users = db.users

export default function * (next) {
  // Verify the authorization is present
  if (!this.headers.authorization) {
    this.body = JRes.failure('No authorization header provided')
    return
  }

  // Verify the authorization is in the correct format
  const token = this.headers.authorization.split(' ')[1]
  if (!token || token.length == 0) {
    this.body = JRes.failure('No token in authorization header provided')
    return
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

    this.status = 400
    this.body = JRes.failure(error, ex)
    return
  }

  // Find user model by ID
  const result = yield users.findOne({
    where: { id: payload.id }
  })
  .then(user => {
    if (!user) {
      return JRes.failure('Failed to find user')
    } else {
      return JRes.success('Successfully authenticated', user)
    }
  })
  .catch(err => {
    return JRes.failure('Failed to find user', err)
  })

  // Return an error if found
  if (!result.success) {
    this.status = 400
    this.body = result
    return
  }

  // If no errors occured, set user and go to next state (route)
  this.state.user = result.data
  yield next
}
