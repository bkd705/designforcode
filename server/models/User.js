export default (bookshelf) => {
  const User = bookshelf.Model.extend({
    tableName: 'users',
    uuid: true,
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

  return bookshelf.model('User', User)
}
