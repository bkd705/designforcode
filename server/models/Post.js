export default (bookshelf) => {
  const Post = bookshelf.Model.extend({
    tableName: 'posts',
    uuid: true,
    hasTimestamps: true,
    user() {
      return this.belongsTo('User', 'user_id', 'id')
    },
    comments() {
      return this.hasMany('Comment')
    },
    getRules(required = false) {
      let rules = {
        title: 'min:5|max:50',
        description: 'string',
        type: 'in:code,design'
      }

      if (required) {
        for (let key of Object.keys(rules)) {
          rules[key] = 'required|' + rules[key]
        }
      }

      return rules
    }
  })

  return bookshelf.model('Post', Post)
}
