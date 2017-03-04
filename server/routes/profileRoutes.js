'use strict'

import Profile from '../controllers/profileController'

module.exports = (router) => {
  router.post('/profile/create', Profile.create)
  router.get('/profile/:id', Profile.findOne)
}
