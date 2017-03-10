import JRes from '../util/JResponse'
import Helpers from '../util/Helpers'
import Model from '../config/db'

export default class PostController {

  /**
   * Method for creating a new user
   * @param next - The next state to transition to
   */
  static * create(next) {
    const user = this.state.user
    const postInfo = this.request.body
    postInfo.user_id = user.id

    const post = new Model.Post(postInfo, { hasTimestamps: true })
    const result = yield post.save()
    .then(post => {
      return JRes.success('Successfully created post!', {
        post: Helpers.transformObj(post.attributes, [
          'id', 'title', 'description', 'type', 'creator_id', 'created_at'
        ])
      })
    })
    .catch(error => {
      return JRes.failure('Failed to create post!', error.message)
    })

    if (!result.success) this.status = 400
    this.body = result
  }

  static * findOne(next) {
    const postId = this.params.id

    // Find post and associated comments
    const result = yield Model.Post
    .query({ where: { id: postId } })
    .fetch({ withRelated: ['comments'] })
    .then(post => {
      if (!post) {
        return JRes.failure('Unable to find post with provided ID')
      }

      return JRes.success('Successfully fetched post by ID', {
        post: Helpers.transformObj(post.attributes, [
          'id', 'title', 'description', 'type', 'user_id', 'created_at'
        ]),
        comments: Helpers.transformArray(post.relations.comments.serialize(), [
          'post_id', 'user_id', 'body', 'created_at'
        ])
      })
    })
    .catch(err => {
      return JRes.failure(err)
    })

    if (!result.success) this.status = 400
    this.body = result
  }

  static * update(next) {
    const user = this.state.user
    const postId = this.params.id
    const postInfo = this.request.body

    // Get post
    const post = yield Model.Post
    .query({ where: { id: postId } })
    .fetch()
    .then(post => {
      if (!post) {
        return JRes.failure('Unable to find post with provided ID')
      }

      return JRes.success('Successfully fetched post by ID', { post })
    })
    .catch(err => {
      return JRes.failure(err)
    })

    // If failure to find post, return
    if (!post.success) {
      this.status = 400
      this.body = post
      return
    }

    // If authenticated user is not the owner, return
    if (post.data.post.attributes.user_id !== user.id) {
      this.status = 400
      this.body = JRes.failure(`You cannot edit a post that isn't yours`)
      return
    }

    // Update post
    const result = yield post.data.post.save(postInfo)
    .then(updated => {
      if (updated) {
        return JRes.success('Successfully updated post!')
      } else {
        return JRes.failure('Failed to update post')
      }
    })
    .catch(err => {
      return JRes.failure(err)
    })

    if (!result.success) this.status = 400
    this.body = result
  }

  static * delete(next) {
    const user = this.state.user
    const postId = this.params.id

    // Get post
    const post = yield Model.Post
    .query({ where: { id: postId } })
    .fetch()
    .then(post => {
      if (!post) {
        return JRes.failure('Unable to find post with provided ID')
      }

      return JRes.success('Successfully fetched post by ID', { post })
    })
    .catch(err => {
      return JRes.failure(err)
    })

    // If failure to find post, return
    if (!post.success) {
      this.status = 400
      this.body = post
      return
    }

    // If authenticated user is not the owner, return
    if (post.data.post.attributes.user_id !== user.id) {
      this.status = 400
      this.body = JRes.failure(`You cannot edit a post that isn't yours`)
      return
    }

    // Delete post
    const result = yield post.data.post.destroy()
    .then(deleted => {
      if (deleted) {
        return JRes.success('Successfully deleted post!')
      } else {
        return JRes.failure('Failed to delete post')
      }
    })
    .catch(err => {
      return JRes.failure(err)
    })

    if (!result.success) this.status = 400
    this.body = result
  }
}
