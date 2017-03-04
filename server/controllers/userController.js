import db from '../config/db'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { validateUser } from '../util/validations'

const users = db.users

export default class UserController {

  /**
   * Method for creating a new user
   * @param next - The next state to transition to
   */
  static * create(next) {
    const user = this.request.body
    const isValid = validateUser(user)

    if (!isValid) {
      this.status = 400
      return this.body = {
        success: false,
        error: 'The user submitted is not valid'
      }
    }

    const result = yield users.find({
      where: {
        username: user.username
      }
    })
    .then(dbResult => {
      if(!dbResult) {
        const hashed_password = bcrypt.hashSync(user.password, 10)
        return users.create({
          username: user.username,
          email: user.email,
          password: hashed_password,
          role: 'user'
        })
        .then(newUser => {
          console.log('newUser')
          const userMin = {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email
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
            message: 'An unexpected error has occurred!',
            error: err
          }
        })
        }
      
      return {
        success: false,
        error: 'There is already a user with that username!'
      }
    })
    .catch(err => {
      return {
        success: false,
        message: 'An unexpected error has occurred!',
        error: err
      }
    })

    if (!result.success) this.status = 400
    this.body = result
  }

  /**
   * Method for finding a user by ID
   * @param next - The next state to transition to
   */
  static * findOne(next) {
    const userId = this.params.id

    const result = yield users.findOne({
      id: userId
    })
    .then(user => {
      if (user == null) {
        return {
          success: false,
          error: 'Unable to find user with provided ID'
        }
      } else {
        return {
          success: true,
          message: 'Successfully fetched user by ID',
          data: user
        }
      }
    })
    .catch(err => {
      return {
        success: false,
        message: 'An unexpected error has occurred!',
        error: err
      }
    })

    if (!result.success) this.status = 400
    this.body = result
  }
}
