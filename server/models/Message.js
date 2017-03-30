import Bookshelf from '../config/Bookshelf'

class Message extends Bookshelf.Model {
  get tableName() { return 'messages' }
  get uuid() { return true }
  get hasTimestamps() { return true }

  static get rules() {
    return {
      room_id: '',
      sender_id: '',
      receiver_id: '',
      message: 'string|min:10'
    }
  }

  sender() {
    return this.belongsTo('User', 'sender_id', 'id')
  }

  receiver() {
    return this.belongsTo('User', 'receiver_id', 'id')
  }

  /**
   * Create a comment
   * @param info - Information to create a comment
   */
  static async create(info) {
    return await (new Message(info)).save()
  }

  /**
   * Find a comment by ID
   * @param id - Comment identifier
   * @param opts - Options for the fetch
   */
  static async findAll(room_id, opts = {}) {
    return await Message.query(qb => {
      qb.where('room_id', '=', room_id)
      qb.orderBy('created_at', 'asc')
    }).fetchAll(opts)
  }
}

export default Bookshelf.model('Message', Message)
