import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { validateUser } from '../util/validations'
import JRes from '../util/JResponse'
import Helpers from '../util/Helpers'
import Model from '../config/Database'

export default class UserController {
  /**
   * Method for creating a new user
   * @param next - The next state to transition to
   */
  static * create(next) {
    const userInfo = this.request.body
    const isValid = validateUser(userInfo)

    // Check if submitted user info is valid
    if (!isValid) {
      this.status = 400
      this.body = JRes.failure('The user submitted is not valid')
      return
    }

    // Hash password
    userInfo.password = bcrypt.hashSync(userInfo.password, 10)

    // Create new user
    const user = new Model.User(userInfo, { hasTimestamps: true })
    const result = yield user.save()
    .then(user => {
      return JRes.success('Successfully created user!', {
        user: Helpers.transformObj(user.attributes, [
          'id', 'username', 'email', 'created_at'
        ])
      })
    })
    .catch(error => {
      return JRes.failure('Failed to create user!', error.message)
    })

    if (result.success) {
      // Create user profile
      Model.Profile.forge({ user_id: result.data.user.id }).save()

      // Create JWT token
      result.data.token = jwt.sign(result.data.user, process.env.JWT_SECRET, { expiresIn: '14 days' })
    } else {
      this.status = 400
    }

    this.body = JRes.success(result)
  }

  static * updateUser(next) {
    const user = this.state.user
    const userId = this.params.id
    const userInfo = this.request.body

    // Check permissions
    if (user.id !== userId) {
      this.status = 400
      this.body = JRes.failure('You are not authorized to do this')
      return
    }

    // Save new user information
    const result = yield user.save(userInfo)
    .then(model => {
      if (model) {
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
    const user = this.state.user
    const userId = this.params.id
    const profileInfo = this.request.body

    // Check permissions
    if (user.id !== userId) {
      this.status = 400
      this.body = JRes.failure('You are not authorized to do this')
      return
    }

    // Fetch profile, and save new profile info
    const profile = yield user.profile().fetch()
    const result = yield profile.save(profileInfo)
    .then(updated => {
      if (updated) {
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
    const user = this.state.user
    const userId = this.params.id
    const oldPassword = this.request.body.oldPassword
    let newPassword = this.request.body.newPassword

    // Check permissions
    if (user.id !== userId) {
      this.status = 400
      this.body = JRes.failure('You are not authorized to do this')
      return
    }

    // Check if passwords are provided
    if (!oldPassword || !newPassword) {
      this.status = 400
      this.body = JRes.failure('Please provide your previous password and your new password')
      return
    }

    // Compare password to current password
    if (!bcrypt.compareSync(oldPassword, user.attributes.password)) {
      this.status = 400
      this.body = JRes.failure('Previous password is incorrect')
      return
    }

    // Hash new password
    newPassword = bcrypt.hashSync(newPassword, 10)

    // Set new password
    const result = yield user.save({ password: newPassword })
    .then(model => {
      if (model) {
        return JRes.success('Successfully updated user password!')
      } else {
        return JRes.failure('Failed to update user password')
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

    // Find user model with profile attributes
    const result = yield Model.User
    .query({ where: { id: userId } })
    .fetch({ withRelated: ['profile'] })
    .then(user => {
      if (user == null) {
        return JRes.failure('Unable to find user with provided ID')
      } else {
        return JRes.success('Successfully fetched user by ID', {
          user: Helpers.transformObj(user.attributes, [
            'id', 'username', 'email', 'role', 'created_at'
          ]),
          profile: Helpers.transformObj(user.relations.profile.attributes, [
            'firt_name', 'last_name', 'profession', 'skill_level', 'description'
          ])
        })
      }
    })
    .catch(err => {
      return JRes.failure(err)
    })

    if (!result.success) this.status = 400
    this.body = result
  }

  static * findPosts(next) {
    const userId = this.params.id

    // Get user and their posts
    const result = yield Model.User
    .query({ where: { id: userId } })
    .fetch({ withRelated: ['posts'] })
    .then(user => {
      if (user == null) {
        return JRes.failure(`Unable to find user's posts with provided ID`)
      } else {
        return JRes.success(`Successfully fetched user's posts by ID`, {
          user: Helpers.transformObj(user.attributes, [
            'id', 'username', 'email', 'role', 'created_at'
          ]),
          posts: Helpers.transformArray(user.relations.posts.serialize(), [
            'id', 'title', 'description', 'type', 'created_at'
          ])
        })
      }
    })
    .catch(err => {
      return JRes.failure(err)
    })

    if (!result.success) this.status = 400
    this.body = result
  }

  static * checkExisting(next) {
    const { field, value } = this.params
    const conditionalWhere = {}
    conditionalWhere[field] = value

    const result = yield Model.User
    .query({ where: conditionalWhere })
    .fetch()
    .then(res => {
      if(!res) {
        return JRes.success('Available!')
      }

      return JRes.failure('Already taken!')
    })
    .catch(err => {
      return JRes.failure(err)
    })

    if (!result.success) this.status = 400
    this.body = result
  }
}
