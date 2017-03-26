import Comment from '../controllers/CommentController.js'
import AuthMiddleware from '../middleware/AuthMiddleware'

module.exports = (router) => {
  router.post('/api/v1/comments', AuthMiddleware, Comment.create)
  router.get('/api/v1/comments/:id', Comment.findOne)
  router.delete('/api/v1/comments/:id', AuthMiddleware, Comment.delete)
  router.put('/api/v1/comments/:id', AuthMiddleware, Comment.update)
}
