import db from '../config/db'
import JRes from '../util/JResponse'
import Helpers from '../util/Helpers'

const posts = db.posts

export default class PostController {

  /**
   * Method for creating a new user
   * @param next - The next state to transition to
   */
  static * create(next) {
    const user = this.state.user

    const post = this.request.body
    post.creator_id = user.id

    const result = yield posts.create(post)
    .then(newPost => {
      return JRes.success('Successfully created post!')
    })
    .catch(err => {
      return JRes.failure(err)
    })

    if (!result.success) {
      this.status = 400

      // Handle/Parser sequelize error
      if (result.error.name && result.error.name.indexOf('Sequelize') > -1) {
        result.error = (result.error.errors) ? result.error.errors[0] : result.error.message
      }
    }

    this.body = result
  }

  static * update(next) {
    const user = this.state.user
    const postId = this.params.id
    const postInfo = this.request.body

    const userPosts = yield user.getPosts()
    console.log(userPosts)

    let post = null
   for (p in userPosts) {
      if (p.id == postId) {
        post = p
        break;
      }
    }

    if (!post) {
      this.status = 400
      this.body = JRes.failure(`You cannot edit a post that isn't yours`)
      return
    }

    const result = yield post.update(postInfo)
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

  static * findComments(next) {
    const postId = this.params.id

    const result = yield posts.findAll({
      where: { id: postId }
    })
    .then(comments => {
      if (comments) {
        return JRes.success('Successfully fetched comments from post', comments)
      } else {
        return JRes.failure('Failed to fetch comments from post')
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

    const userPosts = yield user.getPosts()
    console.log(userPosts)

    let post = null
    for (p in userPosts) {
      if (p.id == postId) {
        post = p
        break;
      }
    }

    if (!post) {
      this.status = 400
      this.body = JRes.failure(`You cannot delete a post that isn't yours`)
      return
    }

    const result = yield post.delete()
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
