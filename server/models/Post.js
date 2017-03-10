export default (bookshelf) => {
  const Post = bookshelf.Model.extend({
    tableName: 'posts',
    uuid: true,
    user() {
      return this.belongsTo('User', 'user_id', 'id')
    },
    comments() {
      return this.hasMany('Comment')
    }
  })

  return bookshelf.model('Post', Post)
}
