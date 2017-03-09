'use strict'

import User from '../controllers/userController'
import AuthMiddleware from '../middleware/authMiddleware'

module.exports = (router) => {
  router.post('/user/create', User.create)

  router.get('/user/:id', User.findOne)
  router.get('/user/:id/posts', User.findPosts)
  router.get('/user/:field/:value', User.checkExisting)

  router.put('/user/:id', AuthMiddleware, User.updateUser)
  router.put('/user/:id/profile', AuthMiddleware, User.updateProfile)
  router.put('/user/:id/password', AuthMiddleware, User.updatePassword)
}
