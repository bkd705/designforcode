import User from '../models/User'

export default class AuthController {
  static authLogin(req, res) {
    const { username, password } = req.body
    User.findOne({ 'username': username }, (err, user) => {
      if(user) {
        if(bcrypt.compareSync(password, user.password)) {
          const storedUser = {
            email: user.email,
            username: user.username,
          }
          const token = jwt.sign(storedUser, config.jwtSecret)
          res.json({ token })
        } else {
          res.status(401).send({
            message: 'Invalid credentials'
          })
        }
      } else {
        res.status(401).send({
          message: 'Invalid credentials'
        })
      }
    })
  }
}