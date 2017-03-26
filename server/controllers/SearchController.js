// Import utilities
import JRes from '../util/JResponse'
import Helpers from '../util/Helpers'
import SendError from '../util/SendError'
import Responses from '../util/Responses'

// Import models
import Post from '../models/Post'
import User from '../models/User'

export default class SearchController {

  static async findPosts(ctx, next) {
    const opts = { withRelated: ['comments', 'user'] }

    // Limit/offset
    let start = 0
    let count = 10

    // Validate and set start offset
    if (ctx.request.query.start && ctx.request.query.start >= 0) {
      start = ctx.request.query.start
    }

    // Validate and set end offset
    if (ctx.request.query.count && ctx.request.query.count > 0) {
      count = ctx.request.query.count
    }

    // Get all posts
    let posts = await Post.query(qb => {
      qb.orderBy('created_at', 'desc')
      qb.limit(count).offset(start)

      if (ctx.request.query.term && ctx.request.query.term.length > 0) {
        qb.whereRaw(
          "LOWER(title) LIKE '%' || LOWER(?) || '%' OR LOWER(description) LIKE '%' || LOWER(?) || '%'",
          [ctx.request.query.term, ctx.request.query.term]
        )
      }
    }).fetchAll(opts)

    // If none, return
    if (!posts) {
      return SendError(ctx, 400, Responses.NO_POSTS_FOUND, posts)
    }

    // Serialize so we can iterate through results
    const serialized = posts.serialize()

    // Iterate over comments, and fetch users associated with comments
    // TODO (FUTURE): Use a raw query to fetch this shit so no need for these loops
    for (let i = 0; i < serialized.length; i++) {
      for (let c = 0; c < serialized[i].comments.length; c++) {
        const user = await User.find(serialized[i].comments[c].user_id)
        serialized[i].comments[c]['user'] = Helpers.transformObj(user.attributes, [
          'id', 'username', 'email'
        ])
        delete serialized[i].comments[c]['user_id']
      }
    }

    ctx.body = JRes.success(Responses.POSTS_FOUND, {
      posts: Helpers.transformArray(serialized, [
        'id',
        { attribute: 'user', fields: ['id', 'username', 'email'] },
        'title', 'description', 'type', 'created_at',
        { attribute: 'comments', fields: ['id', 'user', 'body', 'created_at'] }
      ])
    })
  }
}
