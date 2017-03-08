'use strict'

import User from '../controllers/userController'

module.exports = (router) => {
  router.post('/user/create', User.create)
  router.get('/user/:field/:value', User.checkExisting)
  router.get('/user/:id', User.findOne)
  router.put('/user/:id', User.updateUser)
  router.put('/user/:id/profile', User.updateProfile)
  router.put('/user/:id/password', User.updatePassword)
}
