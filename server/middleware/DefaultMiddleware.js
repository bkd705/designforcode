// Import utilities
import SendError from '../util/SendError'
import Responses from '../util/Responses'

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
      let error = Responses.INTERNAL_SERVER_ERROR

      if (err.detail) {
        data = err.detail
      } else if (err[0] && err[0].validation && err[0].message) {
        error = Responses.VALIDATION_ERROR
        data = err[0].message
      }

      SendError(ctx, 400, error, data)
    }
  })
}
