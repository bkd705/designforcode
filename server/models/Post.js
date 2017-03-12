import Bookshelf from '../config/Bookshelf'

const Post = Bookshelf.Model.extend({
  tableName: 'posts',
  uuid: true,
  hasTimestamps: true,
  user() {
    return this.belongsTo('User', 'user_id', 'id')
  },
  comments() {
    return this.hasMany('Comment')
  }
})

/**
 * Returns the rules for validation
 * @param required - If the fields should be required
 */
Post.getRules = (required = false) => {
  let rules = {
    title: 'min:5|max:50',
    description: 'string',
    type: 'in:code,design'
  }

  if (required) {
    for (let key of Object.keys(rules)) {
      rules[key] = 'required|' + rules[key]
    }
  }

  return rules
}

/**
 * Create a post
 * @param info - Information to create a post
 */
Post.create = async (info) => {
  return await (new Post(info)).save()
}

/**
 * Find a post by ID
 * @param id - Post identifier
 * @param opts - Options for the fetch
 */
Post.find = async (id, opts = {}) => {
  return await Post.where('id', id).fetch(opts)
}

/**
 * Update a post
 * @param post - Post model to update
 * @param info - Information to update with
 */
Post.update = async (post, info) => {
  return await post.save(info)
}

/**
 * Delete a post
 * @param post - Post to delete
 */
Post.delete = async (post) => {
  return await post.destroy()
}

export default Bookshelf.model('Post', Post)
