// Import node modules
import jwt from 'jsonwebtoken'
import indicative from 'indicative'
import bcrypt from 'bcrypt'

// Import utilities
import JRes from '../util/JResponse'
import Helpers from '../util/Helpers'
import SendError from '../util/SendError'

// Import models
import User from '../models/User'
import Profile from '../models/Profile'

export default class UserController {
  /**
   * Method for creating a new user
   * @param ctx - The current request context
   * @param next - The next state to transition to
   */
  static async create(ctx, next) {
    const userInfo = ctx.request.body

    // Validate user info
    await indicative.validateAll(userInfo, User.getRules(true))

    // Create user
    const user = await User.create(userInfo)
    if (!user) {
      return SendError(ctx, 400, 'Failed to create user!', user)
    }

    // Sanitize user info
    const outputUser = Helpers.transformObj(
      user.attributes, ['id', 'username', 'email']
    )

    // Create user profile
    Profile.create({ user_id: user.id })

    // Create/Sign JWT
    const token = jwt.sign(outputUser, process.env.JWT_SECRET, { expiresIn: '14 days' })

    // Send response
    ctx.body = JRes.success('Successfully created user!', {
      user: outputUser,
      token
    })
  }

  /**
   * Method for updating a user's immediate information
   * @param ctx - The current request context
   * @param next - The next state to transition to
   */
  static async updateUser(ctx, next) {
    const currUser = ctx.state.user
    const userId = ctx.params.id
    const userInfo = ctx.request.body

    // Check permissions
    if (currUser.id !== userId && currUser.attributes.role !== 'admin') {
      return SendError(ctx, 400, 'You are not authorized to do this')
    }

    // Validate user info
    await indicative.validateAll(userInfo, User.getRules())

    // Find user by ID
    const user = await User.find(userId)
    if (!user) {
      return SendError(ctx, 400, 'Failed to update user!', user)
    }

    // Update user
    const result = await User.update(user, userInfo)
    if (!result) {
      return SendError(ctx, 400, user)
    }

    // Sanitize user info
    const outputUser = Helpers.transformObj(
      user.attributes, ['id', 'username', 'email']
    )

    // Send response
    ctx.body = JRes.success('Successfully updated user!', { user: outputUser })
  }

  /**
   * Method for updating a user's profile information
   * @param ctx - The current request context
   * @param next - The next state to transition to
   */
  static async updateProfile(ctx, next) {
    const currUser = ctx.state.user
    const userId = ctx.params.id
    const profileInfo = ctx.request.body

    // Check permissions
    if (currUser.id !== userId && currUser.attributes.role !== 'admin') {
      return SendError(ctx, 403, 'You are not authorized to do this')
    }

    // Validate user info
    await indicative.validateAll(profileInfo, Profile.getRules())

    // Find user by ID
    const user = await User.find(userId)
    if (!user) {
      return SendError(ctx, 400, user)
    }

    // Fetch profile, and save new profile info
    const profile = await user.profile().fetch()
    const result = await Profile.update(profile, profileInfo)
    if (!result) {
      return SendError(ctx, 400, result)
    }

    // Send response
    ctx.body = JRes.success('Successfully updated user profile!', {
      user: Helpers.transformObj(user.attributes, [
        'id', 'username', 'email'
      ]),
      profile: Helpers.transformObj(result.attributes, [
        'first_name', 'last_name', 'profession', 'skill_level', 'description'
      ])
    })
  }

  /**
   * Method for updating a user's password
   * @param ctx - The current request context
   * @param next - The next state to transition to
   */
  static async updatePassword(ctx, next) {
    const currUser = ctx.state.user
    const userId = ctx.params.id
    const oldPassword = ctx.request.body.oldPassword
    let newPassword = ctx.request.body.newPassword

    // Check if passwords are provided
    if (!oldPassword || !newPassword) {
      return SendError(ctx, 400, 'Required information not provided')
    }

    // Check permissions
    if (currUser.id !== userId && currUser.attributes.role !== 'admin') {
      return SendError(ctx, 403, 'You are not authorized to do this')
    }

    // Find user by ID
    const user = await User.find(userId)
    if (!user) {
      return SendError(ctx, 400, user)
    }

    // Compare password to current password
    if (!bcrypt.compareSync(oldPassword, user.attributes.password)) {
      return SendError(ctx, 400, 'Old password in incorrect')
    }

    // Hash new password
    newPassword = bcrypt.hashSync(newPassword, 10)

    // Set new password
    const result = await User.update(user, { password: newPassword })
    if (!result) {
      return SendError(ctx, 400, user)
    }

    // Send response
    ctx.body = JRes.success('Successfully updated user password!')
  }

  /**
   * Method for finding a user by ID
   * @param ctx - The current request context
   * @param next - The next state to transition to
   */
  static async findOne(ctx, next) {
    const userId = ctx.params.id

    // Find user model with profile
    const opts = { withRelated: ['profile'] }
    const user = await User.find(userId, opts)
    if (!user) {
      return SendError(ctx, 400, 'Failed to find user!', user)
    }

    // Send response
    ctx.body = JRes.success('Successfully fetched user!', {
      user: Helpers.transformObj(user.attributes, [
        'id', 'username', 'email', 'role', 'created_at'
      ]),
      profile: Helpers.transformObj(user.relations.profile.attributes, [
        'firt_name', 'last_name', 'profession', 'skill_level', 'description'
      ])
    })
  }

  /**
   * Method for finding a user's post
   * @param ctx - The current request context
   * @param next - The next state to transition to
   */
  static async findPosts(ctx, next) {
    const userId = ctx.params.id

    // Get user and their posts
    const opts = { withRelated: ['posts'] }
    const user = await User.find(userId, opts)
    if (!user) {
      return SendError(ctx, 400, 'Failed to find user!', user)
    }

    // Send response
    ctx.body = JRes.success(`Successfully fetched user's posts!`, {
      user: Helpers.transformObj(user.attributes, [
        'id', 'username', 'email', 'role', 'created_at'
      ]),
      posts: Helpers.transformArray(user.relations.posts.serialize(), [
        'id', 'title', 'description', 'type', 'created_at'
      ])
    })
  }

  /**
   * Method for checking if user info exists (front-end)
   * @param ctx - The current request context
   * @param next - The next state to transition to
   */
  static async checkExisting(ctx, next) {
    const { field, value } = ctx.params
    const conditionalWhere = {}
    conditionalWhere[field] = value

    const user = await User.query({ where: conditionalWhere }).fetch()
    if (!user) {
      ctx.body = JRes.success('Available!')
    }

    SendError(ctx, 400, 'Unavailable!')
  }
}
