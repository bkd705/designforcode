import db from '../config/db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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
        return {
          success: false,
          message: 'No user with that username found!'
        }
      }
      if(!bcrypt.compareSync(user.password, foundUser.password)) {
        return {
          success: false,
          message: 'Password is not correct'
        }
      }

      const userMin = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email
      }

      const token = jwt.sign(userMin, process.env.JWT_SECRET)
      return {
        success: true,
        message: 'Successfully created new user!',
        data: {
          user: userMin,
          token: token
        }
      }
    })
    .catch(err => {
      return {
        success: false,
        message: 'An unexpected error has occured!',
        error: err
      }
    })

    if (!result.success) this.status = 400
    this.body = result
  }
}