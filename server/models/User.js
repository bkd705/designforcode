export default (bookshelf) => {
  const User = bookshelf.Model.extend({
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
    },
    getRules(required = false) {
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
  })

  return bookshelf.model('User', User)
}
