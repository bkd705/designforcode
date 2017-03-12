// Import utilities
import SendError from '../util/SendError'

module.exports = (app) => {
  /**
   * The default middleware. Handles all unhandled exceptions
   * @param ctx - The current request context
   * @param next - The next state to transition to
   */
  app.use(async function (ctx, next) {
    try {
      await next()
    } catch (err) {
      console.log(err)

      let data = null
      if (err.detail) {
        data = err.detail
      }

      SendError(ctx, 400, 'There was an error with your request', data)
    }
  })
}
