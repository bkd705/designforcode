// Import node modules
import indicative from 'indicative'

// Import utilities
import JRes from '../util/JResponse'
import Helpers from '../util/Helpers'
import SendError from '../util/SendError'

// Import models
import Post from '../models/Post'

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
      return SendError(ctx, 400, 'Failed to create post!', post)
    }

    // Send response
    ctx.body = JRes.success('Successfully created post!', {
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
      return SendError(ctx, 400, 'Failed to find post!', post)
    }

    // Send response
    ctx.body = JRes.success('Successfully fetched post!', {
      post: Helpers.transformObj(post.attributes, [
        'id', 'title', 'description', 'type', 'user_id', 'created_at'
      ]),
      comments: Helpers.transformArray(post.relations.comments.serialize(), [
        'post_id', 'user_id', 'body', 'created_at'
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
      return SendError(ctx, 400, 'Failed to find post!', post)
    }

    // If authenticated user is not the owner, return
    if (post.attributes.user_id !== currUser.id && currUser.attributes.role !== 'admin') {
      return SendError(ctx, 403, 'You are not authorized to do this')
    }

    // Update post
    const updated = await Post.update(post, postInfo)
    if (!updated) {
      return SendError(ctx, 400, 'Failed to update post!', updated)
    }

    // Send response
    ctx.body = JRes.success('Successfully updated post!', {
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
      return SendError(ctx, 400, 'Failed to find post!', post)
    }

    // If authenticated user is not the owner, return
    if (post.attributes.user_id !== currUser.id && currUser.attributes.role !== 'admin') {
      return SendError(ctx, 403, 'You are unauthorized to do this')
    }

    // Delete post
    const deleted = await Post.delete(post.data.post)
    if (!deleted) {
      return SendError(ctx, 400, 'Failed to delete post!', deleted)
    }

    // Send response
    ctx.body = JRes.success('Successfully deleted post!')
  }
}
