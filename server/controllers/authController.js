import db from '../config/db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import JRes from '../util/JResponse'

const users = db.users

export default class AuthController {
  
  static * login(next) {
    const user = this.request.body

    const result = yield users.findOne({
      where: {
        username: user.username
      }
    })
    .then(foundUser => {
      if(!foundUser) {
        return JRes.failure('No user found with that username!')
      }
      if(!bcrypt.compareSync(user.password, foundUser.password)) {
        return JRes.failure('Password is incorrect.')
      }

      const userMin = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email
      }

      const token = jwt.sign(userMin, process.env.JWT_SECRET)
      return JRes.success('Successfully created new user!', { user: userMin, token: token })
    })
    .catch(err => {
      return JRes.failure(err)
    })

    if (!result.success) {
      this.status = 400

      // Handle/Parser sequelize error
      if (result.error.name && result.error.name.indexOf('Sequelize') > -1) {
        result.error = result.error.errors[0].message
      }
    }

    this.body = result
  }
}