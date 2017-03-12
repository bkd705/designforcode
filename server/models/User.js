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
})

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

User.create = async ({ username, email, password }) => {
  const user = new User({
    username,
    email,
    password: bcrypt.hashSync(password, 10)
  })

  return await user.save()
}

User.find = async (id, opts = {}) => {
  return await User.where('id', id).fetch(opts)
}

User.findByUsername = async (username, opts = {}) => {
  return await User.where('username', username).fetch(opts)
}

User.update = async (user, info) => {
  return await user.save(info)
}

User.delete = async (user) => {
  return await user.destroy()
}

export default Bookshelf.model('User', User)
