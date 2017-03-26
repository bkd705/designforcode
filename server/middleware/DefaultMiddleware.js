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
      let error = 'There was an error with your request'

      if (err.detail) {
        data = err.detail
      } else if (err[0].validation && err[0].message) {
        error = 'Validation error'
        data = err[0].message
      }

      SendError(ctx, 400, error, data)
    }
  })
}
