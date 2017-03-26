import Post from '../controllers/PostController.js'
import AuthMiddleware from '../middleware/AuthMiddleware'

module.exports = (router) => {
  router.post('/api/v1/posts', AuthMiddleware, Post.create)
  router.get('/api/v1/posts', Post.fetchPosts)
  router.get('/api/v1/posts/:id', Post.findOne)
  router.put('/api/v1/posts/:id', AuthMiddleware, Post.update)
  router.delete('/api/v1/posts/:id', AuthMiddleware, Post.delete)
}
