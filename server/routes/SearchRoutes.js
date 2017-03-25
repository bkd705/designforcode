import SearchController from '../controllers/SearchController'

module.exports = (router) => {
  router.get('/search', SearchController.findPosts)
}
