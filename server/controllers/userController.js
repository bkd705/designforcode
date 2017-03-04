import db from '../config/db'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { validateUser } from '../util/validations'

const users = db.users

/**
 * Method for creating a new user
 * @param req the request paramater passed from express
 * @param res the response parameter passed from express
 */
export function createUser(req, res) {
  const user = req.body
  const isValid = validateUser(user)

  if(isValid) {
    const hashed_password = bcrypt.hashSync(user.password, 10)
    users.create({
      username: user.username,
      email: user.email,
      password: hashed_password,
      role: 'user'
    })
    .then(newUser => {
      const userMin = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      }
      const token = jwt.sign(userMin, process.env.JWT_SECRET)
      res.send({
        user: userMin,
        token: token,
        status: 'success',
        message: 'New user created successfully!'
      })
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        message: 'An unexpected error occurred!'
      })
    })
  } else {
    res.status(400).json({
      err: 'Not a valid user',
      message: 'The user submitted is not valid'
    })
  }
}

export function findOneUser(req, res) {
  const userId = req.params.id

  users.findOne({
    id: userId
  })
  .then(user => {
    res.send({ user })
  })
  .catch(err => {
    res.status(500).json({
      err: err,
      message: 'An unexpected error has occurred!'
    })
  })
}
