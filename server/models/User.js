import Bookshelf from '../config/Bookshelf'
import bcrypt from 'bcrypt'

const User = Bookshelf.Model.extend({
  tableName: 'users',
  uuid: true,
  hasTimestamps: true,
  profile() {
    return this.hasOne('Profile')
  },
  posts() {
    return this.hasMany('Post')
  },
  comments() {
    return this.hasMany('Comment')
  }
}, {
  dependents: ['profiles', 'posts', 'comments']
})

/**
 * Returns the rules for validation
 * @param required - If the fields should be required
 */
User.getRules = (required = false) => {
  let rules = {
    username: 'min:3|max:15|alpha_numeric',
    email: 'email',
    password: 'min:6|max:50'
  }

  if (required) {
    for (let key of Object.keys(rules)) {
      rules[key] = 'required|' + rules[key]
    }
  }

  return rules
}

/**
 * Create a User
 * @param {values} - Information to create a user
 */
User.create = async ({ username, email, password }) => {
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
User.find = async (id, opts = {}) => {
  return await User.where('id', id).fetch(opts)
}

/**
 * Find a comment by username
 * @param username - User username
 * @param opts - Options for the fetch
 */
User.findByUsername = async (username, opts = {}) => {
  return await User.where('username', username).fetch(opts)
}

/**
 * Update a user
 * @param user - User model to update
 * @param info - Information to update with
 */
User.update = async (user, info) => {
  return await user.save(info)
}

/**
 * Delete a user
 * @param user - User to delete
 */
User.delete = async (user) => {
  return await user.destroy()
}

export default Bookshelf.model('User', User)
