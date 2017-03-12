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

Post.create = async (info) => {
  return await (new Post(info)).save()
}

Post.find = async (id, opts = {}) => {
  return await Post.where('id', id).fetch(opts)
}

Post.update = async (post, info) => {
  return await post.save(info)
}

Post.delete = async (post) => {
  return await post.destroy()
}

export default Bookshelf.model('Post', Post)
