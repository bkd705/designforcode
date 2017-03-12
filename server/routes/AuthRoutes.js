import Auth from '../controllers/AuthController'

module.exports = (router) => {
  router.post('/auth/login', Auth.login)
}
