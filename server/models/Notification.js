import Bookshelf from '../config/Bookshelf'

class Notification extends Bookshelf.Model {
  get tableName() { return 'notifications' }
  get uuid() { return true }
  get hasTimestamps() { return true }

  user() {
    return this.belongsTo('User', 'to_user', 'id')
  }

  from_user() {
    return this.belongsTo('User', 'from_user', 'id')
  }

  /**
   * Create a notification
   * @param info - Information to create a comment
   */
  static async create(info) {
    return await (new Notification(info)).save()
  }

  /**
   * Find a notification by ID
   * @param id - Notification identifier
   * @param opts - Options for the fetch
   */
  static async find(id, opts = {}) {
    return await Notification.where('id', id).fetch(opts)
  }

  /**
   * Find a notification by user's username
   * @param username - User username
   * @param opts - Options for the fetch
   */
  static async findByUserId(userId, opts = {}) {
    return await Notification.where('to_user', userId).fetchAll(opts)
  }

  /**
   * Delete a notification
   * @param notification - Notification to delete
   */
  static async delete(notification) {
    return await notification.destroy()
  }
}

export default Bookshelf.model('Notification', Notification)
