export default (bookshelf) => {
  const Comment = bookshelf.Model.extend({
    tableName: 'comments',
    uuid: true,
    post() {
      return this.belongsTo('Post', 'post_id', 'id')
    },
    user() {
      return this.belongsTo('User', 'user_id', 'id')
    }
  })

  return bookshelf.model('Comment', Comment)
}
