import Bookshelf from '../config/Bookshelf'

class Message extends Bookshelf.Model {
  get tableName() { return 'messages' }
  get uuid() { return true }
  get hasTimestamps() { return true }

  sender() {
    return this.belongsTo('User', 'sender_id', 'id')
  }

  receiver() {
    return this.belongsTo('User', 'receiver_id', 'id')
  }

  /**
   * Returns the rules for validation
   * @param required - If the fields should be required
   */
  static getRules(required = false) {
    let rules = {
      sender_id: '',
      receiver_id: '',
      message: 'string|min:10'
    }

    if (required) {
      for (let key of Object.keys(rules)) {
        rules[key] = 'required|' + rules[key]
      }
    }

    return rules
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
  static async findAll(sender_id, receiver_id, opts = {}) {
    return await Message.query(qb => {
      qb.where('sender_id', '=', sender_id).andWhere('receiver_id', '=', receiver_id)
      qb.orWhere('sender_id', '=', receiver_id).andWhere('receiver_id', '=', sender_id)
      qb.orderBy('created_at', 'asc')
    }).fetchAll(opts)
  }
}

export default Bookshelf.model('Message', Message)
