export default (bookshelf) => {
  const Profile = bookshelf.Model.extend({
    tableName: 'profiles',
    uuid: true,
    hasTimestamps: false,
    user() {
      return this.belongsTo('User', 'user_id', 'id')
    },
    getRules(required = false) {
      let rules = {
        first_name: 'alpha|min:2|max:20',
        last_name: 'alpha|min:2|max:20',
        profession: 'in:developer,designer',
        skill_level: 'in:beginner,intermediate,advanced',
        description: 'string'
      }

      if (required) {
        for (let key of Object.keys(rules)) {
          rules[key] = 'required|' + rules[key]
        }
      }

      return rules
    }
  })

  return bookshelf.model('Profile', Profile)
}
