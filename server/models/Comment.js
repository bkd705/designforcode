export default (bookshelf) => {
  const Comment = bookshelf.Model.extend({
    tableName: 'comments',
    uuid: true,
    hasTimestamps: true,
    post() {
      return this.belongsTo('Post', 'post_id', 'id')
    },
    user() {
      return this.belongsTo('User', 'user_id', 'id')
    },
    getRules(required = false) {
      let rules = {
        post_id: 'min:5|max:50',
        body: 'string|min:10'
      }

      if (required) {
        for (let key of Object.keys(rules)) {
          rules[key] = 'required|' + rules[key]
        }
      }

      return rules
    }
  })

  return bookshelf.model('Comment', Comment)
}
