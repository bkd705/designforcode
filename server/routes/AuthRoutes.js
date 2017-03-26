import Auth from '../controllers/AuthController'

module.exports = (router) => {
  router.post('/api/v1/auth/login', Auth.login)
}
