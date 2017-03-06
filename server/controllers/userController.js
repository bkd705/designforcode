import db from '../config/db'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { validateUser } from '../util/validations'
import JRes from '../util/JResponse'

const users = db.users
const profiles = db.profiles

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
      return this.body = JRes.failure('The user submitted is not valid')
    }

    const hashed_password = bcrypt.hashSync(user.password, 10)
    const result = yield users.create({
      username: user.username,
      email: user.email,
      password: hashed_password,
      role: 'user'
    })
    .then(newUser => {
      const userMin = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      }

      const token = jwt.sign(userMin, process.env.JWT_SECRET)

      profiles.create({
        user_id: newUser.id,
        first_name: '',
        last_name: '',
        profession: '',
        skill_level: '',
        description: ''
      })

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
        return JRes.failure('Unable to find user with provided ID')
      } else {
        return JRes.success('Successfully fetched user by ID', {
          user
        })
      }
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
    } else {
      // Fetch profile information
      const profile = yield result.data.user.getProfile()
        .then(userProfile => {
          return userProfile.dataValues
        })
        .catch(err => {
          return 'Failed to fetch profile information'
      })

      // Set profile and user information
      result.data.user = result.data.user.dataValues
      result.data.profile = profile
    }

    this.body = result
  }
}
