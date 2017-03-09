import db from '../config/db'
import JRes from '../util/JResponse'
import Helpers from '../util/Helpers'

const comments = db.comments

export default class CommentController {

  /**
   * Method for creating a new user
   * @param next - The next state to transition to
   */
  static * create(next) {
    const user = this.state.user

    const comment = this.request.body
    comment.user_id = user.id

    const result = yield comments.create(comment)
    .then(newComment => {
      return JRes.success('Successfully created comment!')
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
    const commentId = this.params.id
    const commentInfo = this.request.body

    const userComments = yield user.getComments()
    console.log(userComments)

    let comment = null
    for (com in userComments) {
      if (com.id == commentId) {
        comment = com
        break
      }
    }

    if (!comment) {
      this.status = 400
      this.body = JRes.failure(`You cannot edit a comment that isn't yours`)
      return
    }

    const result = yield comment.update(commentInfo)
    .then(updated => {
      if (updated) {
        return JRes.success('Successfully updated comment!')
      } else {
        return JRes.failure('Failed to update comment')
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
    const commentId = this.params.id

    const userComments = yield user.getComments()
    console.log(userComments)

    let comment = null
    for (com in userComments) {
      if (com.id == commentId) {
        comment = com
        break;
      }
    }

    if (!comment) {
      this.status = 400
      this.body = JRes.failure(`You cannot delete a comment that isn't yours`)
      return
    }

    const result = yield comment.delete()
    .then(deleted => {
      if (deleted) {
        return JRes.success('Successfully deleted comment!')
      } else {
        return JRes.failure('Failed to delete comment')
      }
    })
    .catch(err => {
      return JRes.failure(err)
    })

    if (!result.success) this.status = 400
    this.body = result
  }
}
