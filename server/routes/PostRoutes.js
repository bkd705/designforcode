import Post from '../controllers/PostController.js'
import AuthMiddleware from '../middleware/AuthMiddleware'

module.exports = (router) => {
  router.post('/post/create', AuthMiddleware, Post.create)
  router.get('/posts', Post.fetchPosts)
  router.get('/post/:id', Post.findOne)
  router.put('/post/:id', AuthMiddleware, Post.update)
  router.delete('/post/:id', AuthMiddleware, Post.delete)
}
