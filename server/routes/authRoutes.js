'use strict'

import Auth from '../controllers/authController'

module.exports = (router) => {
  router.post('/auth/login', Auth.login)
}
