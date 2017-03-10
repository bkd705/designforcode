'use strict'

import Post from '../controllers/postController.js'
import AuthMiddleware from '../middleware/authMiddleware'

module.exports = (router) => {
  router.post('/post/create', AuthMiddleware, Post.create)
  router.get('/post/:id', Post.findOne)
  router.put('/post/:id', AuthMiddleware, Post.update)
  router.delete('/post/:id', AuthMiddleware, Post.delete)
}
