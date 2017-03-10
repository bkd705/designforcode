'use strict'

import Comment from '../controllers/CommentController.js'
import AuthMiddleware from '../middleware/AuthMiddleware'

module.exports = (router) => {
  router.post('/comment/create', AuthMiddleware, Comment.create)
  router.get('/comment/:id', Comment.findOne)
  router.put('/comment/:id', AuthMiddleware, Comment.update)
  router.delete('/comment/:id', AuthMiddleware, Comment.delete)
}
