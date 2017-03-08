import jwt from 'jsonwebtoken'
import db from '../config/db'

const users = db.users

export default function * (next) {
  const token = this.headers.authorization.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    users.findOne({
      where: {
        id: payload.id
      }
    })
    .then(user => {
      if (!user) {
        this.state.user = null
      }

      this.state.user = user
    })
  } catch (e) {
    this.state.user = null
  }

  yield next
}
