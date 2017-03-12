import Bookshelf from '../config/Bookshelf'

class Comment extends Bookshelf.Model {
  get tableName() { return 'comments' }
  get uuid() { return true }
  get hasTimestamps() { return true }

  post() {
    return this.belongsTo('Post', 'post_id', 'id')
  }

  user() {
    return this.belongsTo('User', 'user_id', 'id')
  }

  /**
   * Returns the rules for validation
   * @param required - If the fields should be required
   */
  static getRules(required = false) {
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

  /**
   * Create a comment
   * @param info - Information to create a comment
   */
  static async create(info) {
    return await (new Comment(info)).save()
  }

  /**
   * Find a comment by ID
   * @param id - Comment identifier
   * @param opts - Options for the fetch
   */
  static async find(id, opts = {}) {
    return await Comment.where('id', id).fetch(opts)
  }

  /**
   * Update a comment
   * @param comment - Comment model to update
   * @param info - Information to update with
   */
  static async update(comment, info) {
    return await comment.save(info)
  }

  /**
   * Delete a comment
   * @param comment - Comment to delete
   */
  static async delete(comment) {
    return await comment.destroy()
  }
}

export default Bookshelf.model('Comment', Comment)
