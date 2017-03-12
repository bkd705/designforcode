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

Comment.create = async (info) => {
  return await (new Comment(info)).save()
}

Comment.find = async (id, opts = {}) => {
  return await Comment.where('id', id).fetch(opts)
}

Comment.update = async (comment, info) => {
  return await comment.save(info)
}

Comment.delete = async (comment) => {
  return await comment.destroy()
}

export default Bookshelf.model('Comment', Comment)
