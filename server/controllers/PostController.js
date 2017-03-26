// Import node modules
import indicative from 'indicative'

// Import utilities
import JRes from '../util/JResponse'
import Helpers from '../util/Helpers'
import SendError from '../util/SendError'
import Responses from '../util/Responses'

// Import models
import Post from '../models/Post'
import User from '../models/User'

export default class PostController {

  /**
   * Method for creating a new post
   * @param ctx - The current request context
   * @param next - The next state to transition to
   */
  static async create(ctx, next) {
    const currUser = ctx.state.user
    const postInfo = ctx.request.body

    // Validate post info
    await indicative.validateAll(postInfo, Post.getRules(true))

    // Set post's user
    postInfo.user_id = currUser.id

    // Create post
    const post = await Post.create(postInfo)
    if (!post) {
      return SendError(ctx, 400, Responses.CREATE_POST_FAILURE, post)
    }

    // Send response
    ctx.body = JRes.success(Responses.CREATE_POST_SUCCESS, {
      post: Helpers.transformObj(post.attributes, [
        'id', 'title', 'description', 'type', 'user_id', 'created_at'
      ])
    })
  }

  /**
   * Method for finding a post by ID
   * @param ctx - The current request context
   * @param next - The next state to transition to
   */
  static async findOne(ctx, next) {
    const postId = ctx.params.id

    // Find post and associated comments
    const opts = { withRelated: ['comments'] }
    const post = await Post.find(postId, opts)
    if (!post) {
      return SendError(ctx, 400, Responses.POST_NOT_FOUND, post)
    }

    // Send response
    ctx.body = JRes.success(Responses.SHOW_POST_SUCCESS, {
      post: Helpers.transformObj(post.attributes, [
        'id', 'title', 'description', 'type', 'user_id', 'created_at'
      ]),
      comments: Helpers.transformArray(post.relations.comments.serialize(), [
        'id', 'post_id', 'user_id', 'body', 'created_at'
      ])
    })
  }

  static async fetchPosts(ctx, next) {
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

  /**
   * Method for updating a post
   * @param ctx - The current request context
   * @param next - The next state to transition to
   */
  static async update(ctx, next) {
    const currUser = ctx.state.user
    const postId = ctx.params.id
    const postInfo = ctx.request.body

    // Validate post info
    await indicative.validateAll(postInfo, Post.getRules())

    // Find post by ID
    const post = await Post.find(postId)
    if (!post) {
      return SendError(ctx, 400, Responses.POST_NOT_FOUND, post)
    }

    // If authenticated user is not the owner, return
    if (post.attributes.user_id !== currUser.id && currUser.attributes.role !== 'admin') {
      return SendError(ctx, 403, Responses.NOT_AUTHORIZED)
    }

    // Update post
    const updated = await Post.update(post, postInfo)
    if (!updated) {
      return SendError(ctx, 400, Responses.UPDATE_POST_FAILURE, updated)
    }

    // Send response
    ctx.body = JRes.success(Responses.UPDATE_POST_SUCCESS, {
      post: Helpers.transformObj(updated.attributes, [
        'id', 'title', 'description', 'type', 'user_id', 'created_at'
      ])
    })
  }

  /**
   * Method for deleting a post
   * @param ctx - The current request context
   * @param next - The next state to transition to
   */
  static async delete(ctx, next) {
    const currUser = ctx.state.user
    const postId = ctx.params.id

    // Find post by ID
    const post = await Post.find(postId)
    if (!post) {
      return SendError(ctx, 400, Responses.POST_NOT_FOUND, post)
    }

    // If authenticated user is not the owner, return
    if (post.attributes.user_id !== currUser.id && currUser.attributes.role !== 'admin') {
      return SendError(ctx, 403, Responses.NOT_AUTHORIZED)
    }

    // Delete post
    const deleted = await Post.delete(post)
    if (!deleted) {
      return SendError(ctx, 400, Responses.DELETE_POST_FAILURE, deleted)
    }

    // Send response
    ctx.body = JRes.success(Responses.DELETE_POST_SUCCESS)
  }
}
