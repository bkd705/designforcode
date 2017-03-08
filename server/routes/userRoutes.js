'use strict'

import User from '../controllers/userController'

module.exports = (router) => {
  router.post('/user/create', User.create)
  router.get('/user/:id', User.findOne)
  router.get('/user/:field/:value', User.checkExisiting)
}
