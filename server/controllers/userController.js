import db from '../config/db'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { validateUser } from '../util/validations'
import JRes from '../util/JResponse'
import Helpers from '../util/Helpers'

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
      const userMin = Helpers.transformObj(newUser.dataValues, ['id', 'username', 'email'])
      const token = jwt.sign(userMin, process.env.JWT_SECRET)

      profiles.create({
        user_id: newUser.id,
        first_name: '',  last_name: '',
        profession: '', skill_level: '', description: ''
      })

      return JRes.success('Successfully created new user!', {
        user: userMin,
        token: token
      })
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

  static * updateUser(next) {
    const userId = this.params.id
    const userInfo = this.request.body

    // TODO: Check if userId matches authenticated user ID or authenticated user is an admin

    // Get user
    // TODO: Change this when user it bootstrapped to request
    const result = yield users.update(userInfo, { where: { id: userId } })
    .then(updated => {
      if (updated.length > 0) {
        return JRes.success('Successfully updated user!')
      } else {
        return JRes.failure('Failed to update user')
      }
    })
    .catch(err => {
      return JRes.failure(err)
    })

    if (!result.success) this.status = 400
    this.body = result
  }

  static * updateProfile(next) {
    const userId = this.params.id
    const profileInfo = this.request.body

    // TODO: Check if userId matches authenticated user ID or authenticated user is an admin

    // Get user
    // TODO: Change this when user it bootstrapped to request
    const result = yield profiles.update(profileInfo, { where: { user_id: userId } })
    .then(updated => {
      if (updated.length > 0) {
        return JRes.success('Successfully updated profile!')
      } else {
        return JRes.failure('Failed to update profile')
      }
    })
    .catch(err => {
      return JRes.failure(err)
    })

    if (!result.success) this.status = 400
    this.body = result
  }

  static * updatePassword(next) {
    const userId = this.params.id
    const oldPassword = this.request.body.oldPassword
    let newPassword = this.request.body.newPassword

    if (!oldPassword || !newPassword) {
      this.status = 400
      return this.body = JRes.failure('Please provide your previous password and your new password')
    }

    // TODO: Check if userId matches authenticated user ID or authenticated user is an admin

    // Get user
    // TODO: Change this when user it bootstrapped to request
    const user = yield users.findOne({
      where: { id: userId }
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

    if (!user.success) {
      this.status = 400
      return this.body = user
    }

    if (!bcrypt.compareSync(oldPassword, user.data.user.password)) {
      this.status = 400
      return this.body = JRes.failure('Password is incorrect.')
    }

    newPassword = bcrypt.hashSync(this.request.body.newPassword, 10)
    const result = yield user.data.user.update({ password: newPassword })
    .then(updated => {
      if (updated.length !== null) {
        return JRes.success('Successfully updated password!')
      } else {
        return JRes.failure('Failed to update password')
      }
    })
    .catch(err => {
      return JRes.failure(err)
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
      where: { id: userId }
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

      // Set and trasnform profile and user information
      result.data.user = Helpers.transformObj(result.data.user.dataValues, [
        'id', 'username', 'email', 'role', 'created_at'
      ])

      result.data.profile = Helpers.transformObj(profile, [
        'user_id', 'first_name', 'last_name', 'profession',
        'skill_level', 'description'
      ])
    }

    this.body = result
  }

  static * checkExisting(next) {
    const { field, value } = this.params
    const conditionalWhere = {}
    conditionalWhere[field] = value

    const result = yield users.findOne({
      where: conditionalWhere
    })
    .then(foundUser => {
      if(!foundUser) {
        return JRes.success('Available!')
      }

      return JRes.failure('Already taken!')
    })
    .catch(err => {
      return JRes.failure('An unexpected error occured', err)
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
