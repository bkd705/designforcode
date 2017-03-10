export default (bookshelf) => {
  const Profile = bookshelf.Model.extend({
    tableName: 'profiles',
    user() {
      return this.belongsTo('User', 'user_id', 'id')
    }
  })

  return bookshelf.model('Profile', Profile)
}
