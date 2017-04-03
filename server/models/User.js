import Bookshelf from '../config/Bookshelf'
import bcrypt from 'bcrypt'

class User extends Bookshelf.Model {
  get tableName() { return 'users' }
  get uuid() { return true }
  get hasTimestamps() { return true }

  static get rules() {
    return {
      username: 'min:3|max:15|alpha_numeric',
      email: 'email',
      password: 'min:1|max:50'
    }
  }

  static get dependents() {
    return ['profiles', 'posts', 'comments', 'notifications']
  }

  profile() {
    return this.hasOne('Profile')
  }

  posts() {
    return this.hasMany('Post')
  }

  comments() {
    return this.hasMany('Comment')
  }

  /**
   * Create a User
   * @param {values} - Information to create a user
   */
  static async create({ username, email, password }) {
    const user = new User({
      username,
      email,
      password: bcrypt.hashSync(password, 10)
    })

    return await user.save()
  }

  /**
   * Find a user by ID
   * @param id - User identifier
   * @param opts - Options for the fetch
   */
  static async find(id, opts = {}) {
    return await User.where('id', id).fetch(opts)
  }

  /**
   * Find a comment by username
   * @param username - User username
   * @param opts - Options for the fetch
   */
  static async findByUsername(username, opts = {}) {
    return await User.where('username', username).fetch(opts)
  }

  /**
   * Update a user
   * @param user - User model to update
   * @param info - Information to update with
   */
  static async update(user, info) {
    return await user.save(info)
  }

  /**
   * Delete a user
   * @param user - User to delete
   */
  static async delete(user) {
    return await user.destroy()
  }
}

export default Bookshelf.model('User', User)
