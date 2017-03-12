import Bookshelf from '../config/Bookshelf'

const Comment = Bookshelf.Model.extend({
  tableName: 'comments',
  uuid: true,
  hasTimestamps: true,
  post() {
    return this.belongsTo('Post', 'post_id', 'id')
  },
  user() {
    return this.belongsTo('User', 'user_id', 'id')
  }
})

/**
 * Returns the rules for validation
 * @param required - If the fields should be required
 */
Comment.getRules = (required = false) => {
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
Comment.create = async (info) => {
  return await (new Comment(info)).save()
}

/**
 * Find a comment by ID
 * @param id - Comment identifier
 * @param opts - Options for the fetch
 */
Comment.find = async (id, opts = {}) => {
  return await Comment.where('id', id).fetch(opts)
}

/**
 * Update a comment
 * @param comment - Comment model to update
 * @param info - Information to update with
 */
Comment.update = async (comment, info) => {
  return await comment.save(info)
}

/**
 * Delete a comment
 * @param comment - Comment to delete
 */
Comment.delete = async (comment) => {
  return await comment.destroy()
}

export default Bookshelf.model('Comment', Comment)
