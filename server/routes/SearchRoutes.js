import SearchController from '../controllers/SearchController'

module.exports = (router) => {
  router.get('/api/v1/search', SearchController.findPosts)
}
