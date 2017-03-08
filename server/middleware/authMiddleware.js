import jwt from 'jsonwebtoken'
import db from '../config/db'
import JRes from '../util/JResponse'

const users = db.users

export default function * (next) {
  if (!this.headers.authorization) {
    this.body = JRes.failure('No authorization header provided')
    return
  }

  const token = this.headers.authorization.split(' ')[1]

  if (!token) {
    this.body = JRes.failure('No token in authorization header provided')
    return
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    const result = users.findOne({
      where: {
        id: payload.id
      }
    })
    .then(user => {
      if (!user) {
        this.status = 500
        return JRes.failure('No user found')
      }

      this.state.user = user
    })

    if (!result.success) this.status = 400
    this.body = result
  } catch (e) {
    if (e.name === 'TokenExpiredError') {
      this.body = JRes.failure('Token provided has expired', e)
      return
    } else if (e.name === 'JsonWebTokenError' && e.message === 'invalid signature') {
      this.body = JRes.failure('Not a valid token', e)
      return
    } else {
      this.body = JRes.failure('An unexpected error occured', e)
      return
    }
  }

  yield next
}
