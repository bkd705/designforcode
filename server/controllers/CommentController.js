// Import node modules
import indicative from 'indicative'

// Import utilities
import JRes from '../util/JResponse'
import Helpers from '../util/Helpers'
import SendError from '../util/SendError'

// Import models
import Comment from '../models/Comment'

export default class CommentController {

  /**
   * Method for creating a comment
   * @param ctx - The current request context
   * @param next - The next state to transition to
   */
  static async create(ctx, next) {
    const currUser = ctx.state.user
    const commentInfo = ctx.request.body

    // Validate comment info
    await indicative.validateAll(commentInfo, Comment.getRules(true))

    // Set comment's user
    commentInfo.user_id = currUser.id

    // Create comment
    const comment = await Comment.create(commentInfo)
    if (!comment) {
      return SendError(ctx, 400, 'Failed to create comment!', comment)
    }

    // Send response
    ctx.body = JRes.success('Successfully created comment!', {
      comment: Helpers.transformObj(comment.attributes, [
        'id', 'post_id', 'user_id', 'body', 'created_at'
      ])
    })
  }

  /**
   * Method for finding a comment by ID
   * @param ctx - The current request context
   * @param next - The next state to transition to
   */
  static async findOne(ctx, next) {
    const commentId = ctx.params.id

    // Find comment by ID
    const comment = await Comment.find(commentId)
    if (!comment) {
      return SendError(ctx, 400, 'Failed to find comment!', comment)
    }

    ctx.body = JRes.success('Successfully fetched comment!', {
      comment: Helpers.transformObj(comment.attributes, [
        'id', 'post_id', 'user_id', 'body', 'created_at'
      ])
    })
  }

  /**
   * Method for updating a comment
   * @param ctx - The current request context
   * @param next - The next state to transition to
   */
  static async update(ctx, next) {
    const currUser = ctx.state.user
    const commentId = ctx.params.id
    const commentInfo = ctx.request.body

    // Validate comment info
    await indicative.validateAll(commentInfo, Comment.getRules())

    // Find comment by ID
    const comment = await Comment.find(commentId)
    if (!comment) {
      return SendError(ctx, 400, 'Failed to find comment!', comment)
    }

    // If authenticated user is not the owner, return
    if (comment.attributes.user_id !== currUser.id && currUser.attributes.role !== 'admin') {
      return SendError(ctx, 403, 'You are unauthorized to do this')
    }

    // Update comment
    const updated = await Comment.update(comment, commentInfo)
    if (!updated) {
      return SendError(ctx, 400, 'Failed to update comment!', updated)
    }

    // Send response
    ctx.body = ctx.body = JRes.success('Successfully updated comment!', {
      comment: Helpers.transformObj(updated.attributes, [
        'id', 'post_id', 'user_id', 'body', 'created_at'
      ])
    })
  }

  /**
   * Method for deleting a comment
   * @param ctx - The current request context
   * @param next - The next state to transition to
   */
  static async delete(ctx, next) {
    const currUser = ctx.state.user
    const commentId = ctx.params.id

    // Find comment by ID
    const comment = await Comment.find(commentId)
    if (!comment) {
      return SendError(ctx, 400, 'Failed to find comment!', comment)
    }

    // If authenticated user is not the owner, return
    if (comment.attributes.user_id !== currUser.id && currUser.attributes.role !== 'admin') {
      return SendError(ctx, 403, 'You are unauthorized to do this')
    }

    // Delete comment
    const deleted = await Comment.delete(comment)
    if (!deleted) {
      return SendError(ctx, 400, 'Failed to delete comment!', deleted)
    }

    // Send response
    ctx.body = JRes.success('Successfully deleted comment!')
  }
}
