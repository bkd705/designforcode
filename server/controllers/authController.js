import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import JRes from '../util/JResponse'
import Helpers from '../util/Helpers'
import Model from '../config/Database'

export default class AuthController {

  static * login(next) {
    const user = this.request.body
    const result = yield Model.User
    .query({ where: { username: user.username } }).fetch()
    .then(model => {
      if (!model) {
        return JRes.failure('No user found with that username!')
      }

      if (!bcrypt.compareSync(user.password, model.attributes.password)) {
        this.status = 400
        return JRes.failure('Incorrect password')
      }

      const userMin = Helpers.transformObj(model.attributes, [
        'id', 'username', 'email', 'created_at'
      ])

      const token = jwt.sign(userMin, process.env.JWT_SECRET, { expiresIn: '14 days' })
      return JRes.success('Successfully logged in!', {
        user: userMin,
        token: token
      })
    })
    .catch(err => {
      return JRes.failure(err)
    })

    if (!result.success) this.status = 400
    this.body = result
  }
}
